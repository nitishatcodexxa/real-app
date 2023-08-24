const rem_model = require('./registration/models/reminder')
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')
const cust_model = require('./registration/models/customer')
exports.addReminder = (req,res)=>{

const {authorization}  =req.headers
if(authorization && authorization.startsWith('Bearer')){
    let token = authorization.split(' ')[1]
jwt.verify(token,process.env.SECKRET_KEY,(err, decode)=>{
if(!err){

const rr = new  rem_model.reminderModel({
    type:req.body.type,
    date:req.body.time,
    email:req.body.reminderemail,
    whatsapp_no:req.body.whatsapp_no,
    user_name:req.body.reminder_user,
    user_id:decode.uuid,
    message:req.body.message,
    reminder_id:uuidv4(),
    is_email:req.body.is_email,
    is_whatsappno:req.body.is_whatsappno,
    last_sent_notification:"",
})

rr.save().then((ss)=>{
res.send({"ok":"ss"})
})

}
})

}

}


 exports.updateReminder = (req,res)=>{

console.log(req.body)

    const {authorization}  =req.headers
    if(authorization && authorization.startsWith('Bearer')){
        let token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err, decode)=>{
    if(!err){
    rem_model.reminderModel.updateOne({"user_id":decode.uuid,"reminder_id":req.body.reminder_id},{
        type:req.body.type,
        date:req.body.time,
        email:req.body.reminderemail,
        whatsapp_no:req.body.whatsapp_no,
        user_name:req.body.reminder_user,
        reminder_id:req.body.reminder_id,
        message:req.body.message,
        is_whatsappno:req.body.is_whatsappno,
        is_email:req.body.is_email,


    }).then((s)=>{

        console.log(s)
res.send({"response":"succesfull"})

    })
}})}}


exports.deleteReminder =(req,res)=>{

    const {authorization}  =req.headers
    if(authorization && authorization.startsWith('Bearer')){
        let token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err, decode)=>{
    if(!err){

        cust_model.customerModel.find({"user_id":decode.uuid,"customer_id":req.body.reminder_id}).then((dd)=>{
            if(dd.length > 0){
            cust_model.customerModel.updateMany({"user_id":decode.uuid,"customer_id":req.body.reminder_id},{is_reminderset:false}).then(()=>{
           
           }).then(()=>{
            rem_model.reminderModel.deleteMany({"user_id":decode.uuid,"reminder_id":req.body.reminder_id}).then((ss)=>{
                res.send({"ok":"ok"})
            }) 
           })
            }else{
                 rem_model.reminderModel.deleteMany({"user_id":decode.uuid,"reminder_id":req.body.reminder_id}).then((ss)=>{
        res.send({"ok":"ok"})
    }) 
            }
        })


      
   


} })
}
}


exports.retriveReminder = (req,res)=>{
    const {authorization}  =req.headers
    if(authorization && authorization.startsWith('Bearer')){
        let token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err, decode)=>{
    if(!err){
    rem_model.reminderModel.find({"user_id":decode.uuid}).then((s)=>{
        res.send({"data":s})
    })


}
    })
}
}



exports.addReminderfromcustomerpage = (req,res)=>{
console.log("adss")
    const {authorization}  =req.headers
    if(authorization && authorization.startsWith('Bearer')){
        let token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err, decode)=>{
    if(!err){
    
    const rr = new  rem_model.reminderModel({
        type:req.body.type,
        date:req.body.time,
        email:req.body.reminderemail,
        whatsapp_no:req.body.whatsapp_no,
        user_name:req.body.reminder_user,
        user_id:decode.uuid,
        message:req.body.message,
        reminder_id: req.body.reminder_id ,   ////// here reminder id equal to customer id
        is_email:req.body.is_email,
        is_whatsappno:req.body.is_whatsappno,
        last_sent_notification:"",
    })
    
    rr.save().then((ss)=>{
        cust_model.customerModel.updateOne({"user_id":decode.uuid,"customer_id":req.body.reminder_id},{is_reminderset:true}).then(()=>{
            res.send({"ok":"ss"})  
        })
    })
    
    }
    })
    
    }
    
    }






    exports.updateaddReminderfromcustomerpage = (req,res)=>{
        console.log("adss")
            const {authorization}  =req.headers
            if(authorization && authorization.startsWith('Bearer')){
                let token = authorization.split(' ')[1]
            jwt.verify(token,process.env.SECKRET_KEY,(err, decode)=>{
            if(!err){
            rem_model.reminderModel.updateOne({"user_id":decode.uuid,"reminder_id":req.body.reminder_id},{type:req.body.type,
                date:req.body.time,
                email:req.body.reminderemail,
                whatsapp_no:req.body.whatsapp_no,
                user_name:req.body.reminder_user,
                user_id:decode.uuid,
                message:req.body.message,
                reminder_id: req.body.reminder_id ,   ////// here reminder id equal to customer id
                is_email:req.body.is_email,
                is_whatsappno:req.body.is_whatsappno}).then(()=>{
            }).then((ss)=>{
                cust_model.customerModel.updateOne({"user_id":decode.uuid,"customer_id":req.body.reminder_id},{is_reminderset:true}).then(()=>{
                    res.send({"ok":"ss"})  
                })
            })
            
            }
            })} }
        


    exports.retriveRemainderbyid=(req,res)=>{
        console.log("adss")
    const {authorization}  =req.headers
    if(authorization && authorization.startsWith('Bearer')){
        let token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err, decode)=>{
    if(!err){
    
        rem_model.reminderModel.findOne({"user_id":decode.uuid,"reminder_id":req.body.id}).then((s)=>{
            res.send({"data":s})
        })
    }})}}
