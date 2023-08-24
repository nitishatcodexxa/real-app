var express = require('express')
var app  =  express()
var cors = require('cors')
app.use(cors())
var bodyParser = require('body-parser');
app.use(bodyParser.json( {limit: "50mb"}))
require('dotenv').config()
app.use(express.static('public'))
app.use(express.static('img'))
app.use(express.static('pdf'))
const { v4: uuidv4 } = require('uuid');
const multer  = require('multer')
const cheakReg = require('./registration/cheakregistration')
const  login = require('./login/login')
require('dotenv').config()
const mongoose = require('mongoose')
const connection = require('./connection/config')
const lead_model =require('./registration/models/lead')
const lead = require('./lead/lead')
const task = require('./task/task')
const cust = require('./customer')
app.use(express.static('./upload'))
app.use(express.static('./img'))
const note_add = require('./note/note')
const reminder  =require('./reminder')
const { jsPDF } = require("jspdf");
const staff = require('./staff')
const bill_data = require('./billing/billings')
const jwt  = require('jsonwebtoken')
const puppeteer = require('puppeteer');
const hbs = require('handlebars')
const fs = require('fs-extra')
const path = require('path')
var cron = require('node-cron');
const moment = require('moment')
const add_event = require('./events/event')
////// model import for notification and reminders

const notification_model = require('./registration/models/notification')
const reminder_model = require('./registration/models/reminder')
const notification_code = require('./notificaiton/notificationcode')



mongoose.connect(connection.db).then(()=>{
    try {
        console.log("connected")
    } catch (error) {
        console.log(error)
    }
})

app.get('/',(req,res)=>{
    res.send('okksjhjrh')
})



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upload')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
  })
  
const upload = multer({ storage: storage })
const cpUpload = upload.fields([{ name:'file', maxCount: 5 }])


app.post('/registration',cheakReg.cheakRegistration,cheakReg.allowRegistration)
app.put('/profileUpdate',cpUpload,cheakReg.profileUpdate)
app.put('/regpasswordUpdare',cheakReg.passwordUpdate)


app.post('/login',login.getLogin)
app.post('/lead',lead.leadAdd)
app.post('/lead/bulk',lead.leadAddBulk)
app.post('/lead/retrive',lead.retriveLead)
app.put('/lead/update',lead.updateLead)
app.put('/lead/update/tag',lead.addTag)
app.put('/lead/update/delete',lead.deleteTag)
app.put('/updateindex',lead.updateAndArrageData)   /// for react dnd changed data 
app.delete('/lead/bulkdelete',lead.bulkDelete)
app.put('/lead/updateAllData',lead.updateLeadAll)
app.delete('/lead/secondpage/bulkdeleteall',lead.bulkDeleteforsecondpage)
app.post('/lead/retriveunicTagUpdate',lead.updatedTagdata)
app.post('/assignedtoupdate',lead.assignedtoupdate)




app.post('/task',cpUpload,task.taskAdd)   ///// for add task in db
app.post('/task/retrive',task.retriveTask)      /// fpor retrive task in db
app.delete('/task/delete',task.taskDelete)
app.put('/task/update',cpUpload,task.taskUpdate)
app.delete('/task/deletefiles',task.taskDeleteFiles)   // for file deleting
app.put('/task/updateDeletedFiles',task.instantFileDelteUpdate)  

app.put('/task/updatestatus',task.taskStatus)
app.put('/task/updatePriority',task.taskPriority)
app.put('/task/updateassignmnet',task.taskStaff)
app.delete('/task/deleteselected',task.taskStaffselelctedDelete)
app.put('/task/updateassigned',task.taskAssignedchange)
app.put('/task/taskUpdateByIndex',task.taskUpdateByIndex)


app.post('/retrivelead',lead.retriveLead)
app.delete('/lead/delete',lead.deleteLead)
app.post('/customer',cust.addCustomer)
app.post('/retrivecustomer',cust.retriveCustomer)
app.put('/updateCostomer',cust.updateCostomer)
app.put('/deactivecostomer',cust.deactivecontomer)
app.put('/activatecostomer',cust.activatecostomerfromdeactive)


//// add note to 
app.post('/task/addtonote',note_add.addNote)

app.delete('/note/delete',note_add.deleteNote)
//// for note retrive
app.post('/note/retrive',note_add.retriveNote)
app.put('/note/update',note_add.updateNote)

///// reminder
app.post('/reminderAdd',reminder.addReminder)
app.post('/reminderRetrive',reminder.retriveReminder)
app.put('/reminderUpdate',reminder.updateReminder)
app.delete('/reminderDelete',reminder.deleteReminder)
app.post('/addreminderfromcustomerpage',reminder.addReminderfromcustomerpage)
app.post('/retrivebyid',reminder.retriveRemainderbyid)
app.post('/updatereminderjfjhjhjhjg',reminder.updateaddReminderfromcustomerpage)
////   for stafff

app.post('/staffadd',staff.staff_add)
app.post('/staffRetrive',staff.staff_retrive)
app.put('/staffupdate',staff.staff_update)
app.delete('/staffdelete',staff.staff_delete)

/////

app.post('/billingData',bill_data.uploadBillingData)
app.post('/billingRetrived',bill_data.billingDataRetrived)


////// notification retrive
app.post('/retriveNotification',notification_code.retriveNotification)
app.post('/notificationDelete',notification_code.deleteNotification)
////// for add event

app.post('/addEvent',add_event.addEvent)
app.post('/sendRetrived',add_event.sendRetrived)







//////  for creating bill 



const compile = async function(templatename,data){
  const filePath =path.join(process.cwd(),'htmlfile',`${templatename}.hbs`)

  const html = await fs.readFile(filePath,'utf8')
  return hbs.compile(html)(data)
};



app.post("/createBill",(req,res)=>{

let unicidpdf = uuidv4()

  const {authorization} = req.headers;
  if(authorization && authorization.startsWith('Bearer')){
    const token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,((err,decode)=>{
      if(!err){
        (async () => {

    try {
     const browser = await puppeteer.launch(
      {
        executablePath: '/usr/bin/chromium-browser',
        headless: 'new',
        args: ['--no-sandbox']
        // `headless: true` (default) enables old Headless;
        // `headless: 'new'` enables new Headless;
        // `headless: false` enables “headful” mode.
      }
     );
      const page = await browser.newPage();
      const content = await compile('Bill',{
        "purchaseDate":req.body.date,
        "packages":req.body.packages,
        "amount":req.body.amount,
        "firstname":req.body.firstname,
        "lastname":req.body.lastname,
        "email":req.body.email,
        "phone":req.body.phone,
        "gst":req.body.gst,
      })
      await page.setContent(content)
      await page.pdf({
        path:`pdf/${unicidpdf}.pdf`,
        format: 'A4',
        printBackground:true
      });
    res.send({"path":unicidpdf})
      await browser.close(); 
      //process.exit()
    } catch (error) {
      
    }  
  })();

      }
    }))
  }
})



var cronTask = cron.schedule('0 0 */23 * * *', async() => {
reminder_model.reminderModel.find().then((data)=>{
if(data.length > 0){
 for (let i = 0; i < data.length; i++) {
  switch (data[i].type) {
    case "once":
      console.log('once')
if(moment(data[i].date).format('YYYY-MM-DD')==moment(new Date()).format('YYYY-MM-DD')){
  const notification = new notification_model.noticationModel({
  date:data[i].date,
  reminder_id:data[i].reminder_id,
  uuid:data[i].user_id,
  notification_text:data[i].message,
  notification_id:uuidv4()
})
notification.save().then((s)=>{
  console.log(s)
})

   }


      break;
    case "Daily":
    
if(data[i].last_sent_notification==""){
 console.log('daily remainder')
 if(moment(data[i].date).format('YYYY-MM-DD')==moment(new Date()).format('YYYY-MM-DD')){
   const notification = new notification_model.noticationModel({
   date:data[i].date,
   reminder_id:data[i].reminder_id,
   uuid:data[i].user_id,
   notification_text:data[i].message,
   notification_id:uuidv4()
 })
 notification.save().then((s)=>{
  reminder_model.reminderModel.updateOne({"user_id":data[i].user_id,"reminder_id":data[i].reminder_id},{"last_sent_notification":moment(new Date()).format('YYYY-MM-DD')}).then((ds)=>{

  })})
}
}else{
  
  if(moment(data[i].last_sent_notification).format('YYYY-MM-DD')==moment(new Date()).format('YYYY-MM-DD')){
    const notification = new notification_model.noticationModel({
    date:data[i].date,
    reminder_id:data[i].reminder_id,
    uuid:data[i].user_id,
    notification_text:data[i].message,
    notification_id:uuidv4()
  })
  notification.save().then((s)=>{
   reminder_model.reminderModel.updateOne({"user_id":data[i].user_id,"reminder_id":data[i].reminder_id},{"last_sent_notification":moment(new Date()).format('YYYY-MM-DD')}).then((ds)=>{
 
   })})
 }

}


      break;
    case "Weekly":

    if(data[i].last_sent_notification==""){
      console.log('daily remainder')
      if(moment(data[i].date).format('YYYY-MM-DD')==moment(new Date()).format('YYYY-MM-DD')){
        const notification = new notification_model.noticationModel({
        date:data[i].date,
        reminder_id:data[i].reminder_id,
        uuid:data[i].user_id,
        notification_text:data[i].message,
        notification_id:uuidv4()
      })
      notification.save().then((s)=>{
       reminder_model.reminderModel.updateOne({"user_id":data[i].user_id,"reminder_id":data[i].reminder_id},{"last_sent_notification":moment(new Date()).format('YYYY-MM-DD')}).then((ds)=>{
     
       })})
     }
     }else{
       if(moment(data[i].last_sent_notification, "YYYY-MM-DD").add(7, 'days')==moment(new Date()).format('YYYY-MM-DD')){
         const notification = new notification_model.noticationModel({
         date:data[i].date,
         reminder_id:data[i].reminder_id,
         uuid:data[i].user_id,
         notification_text:data[i].message,
         notification_id:uuidv4()
       })
       notification.save().then((s)=>{
        reminder_model.reminderModel.updateOne({"user_id":data[i].user_id,"reminder_id":data[i].reminder_id},{"last_sent_notification":moment(new Date()).format('YYYY-MM-DD')}).then((ds)=>{
      
        })})
      }
     }
     


      break;
      case "Monthly":
      
      
      if(data[i].last_sent_notification==""){
        console.log('daily remainder')
        if(moment(data[i].date).format('YYYY-MM-DD')==moment(new Date()).format('YYYY-MM-DD')){
          const notification = new notification_model.noticationModel({
          date:data[i].date,
          reminder_id:data[i].reminder_id,
          uuid:data[i].user_id,
          notification_text:data[i].message,
          notification_id:uuidv4()
        })
        notification.save().then((s)=>{
         reminder_model.reminderModel.updateOne({"user_id":data[i].user_id,"reminder_id":data[i].reminder_id},{"last_sent_notification":moment(new Date()).format('YYYY-MM-DD')}).then((ds)=>{
       
         })})
       }
       }else{
         if(moment(data[i].last_sent_notification, "YYYY-MM-DD").add(28, 'days')==moment(new Date()).format('YYYY-MM-DD')){
           const notification = new notification_model.noticationModel({
           date:data[i].date,
           reminder_id:data[i].reminder_id,
           uuid:data[i].user_id,
           notification_text:data[i].message,
           notification_id:uuidv4()
         })
         notification.save().then((s)=>{
          reminder_model.reminderModel.updateOne({"user_id":data[i].user_id,"reminder_id":data[i].reminder_id},{"last_sent_notification":moment(new Date()).format('YYYY-MM-DD')}).then((ds)=>{
        
          })})
        }
       }
       
  
      break;
      case "Yearly":
          
      if(data[i].last_sent_notification==""){
        console.log('daily remainder')
        if(moment(data[i].date).format('YYYY-MM-DD')==moment(new Date()).format('YYYY-MM-DD')){
          const notification = new notification_model.noticationModel({
          date:data[i].date,
          reminder_id:data[i].reminder_id,
          uuid:data[i].user_id,
          notification_text:data[i].message,
          notification_id:uuidv4()
        })
        notification.save().then((s)=>{
         reminder_model.reminderModel.updateOne({"user_id":data[i].user_id,"reminder_id":data[i].reminder_id},{"last_sent_notification":moment(new Date()).format('YYYY-MM-DD')}).then((ds)=>{
       
         })})
       }
       }else{
         if(moment(data[i].last_sent_notification, "YYYY-MM-DD").add(365, 'days')==moment(new Date()).format('YYYY-MM-DD')){
           const notification = new notification_model.noticationModel({
           date:data[i].date,
           reminder_id:data[i].reminder_id,
           uuid:data[i].user_id,
           notification_text:data[i].message,
           notification_id:uuidv4()
         })
         notification.save().then((s)=>{
          reminder_model.reminderModel.updateOne({"user_id":data[i].user_id,"reminder_id":data[i].reminder_id},{"last_sent_notification":moment(new Date()).format('YYYY-MM-DD')}).then((ds)=>{
        
          })})
        }
       }
       

       break;
  }
 }}
})
});

cronTask.start();











app.listen(5000,()=>{
    console.log("listening")
})




/*
let da = new Date()
 var now = new Date(Date.now() - (5 * 60 * 1000));
 var compar_date = moment(da).valueOf()
var targetDate = moment(data[i].date).valueOf()

var now = new Date(Date.now() + (5 * 60 * 1000));
var compar_date = moment(now).valueOf()

if((targetDate - compar_date) < 30000){
  const notification = new notification_model.noticationModel({
  date:data[i].date,
  reminder_id:data[i].reminder_id,
  uuid:data[i].user_id,
  notification_text:"you have previously set nototification",
  notification_id:uuidv4()

})
notification.save().then((s)=>{
  console.log(s)
})
}}

}else{

}
*/

/*
reminder_model.reminderModel.updateOne({"user_id":data[i].user_id,"reminder_id":data[i].reminder_id},{"last_sent_notification":moment(Date).format('YYYY-MM-DD')}).then((ds)=>{


  
})

*/