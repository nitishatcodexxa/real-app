
const { escape } = require('mysql');
const lead = require('../registration/models/lead')
const lead_model = require('../registration/models/lead')
const { v4: uuidv4 } = require('uuid');
const jwt  = require('jsonwebtoken')
const { JsonWebTokenError } = require('jsonwebtoken');
 
exports.leadAdd=(req,res)=>{
let token ;
const {authorization} = req.headers
if(authorization && authorization.startsWith('Bearer')){
token = authorization.split(' ')[1]
jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
if(!err){ 
const lead_id = uuidv4()
const saveLead = new  lead_model.leadModel({
    status:req.body.status,
    source:req.body.source,
    user: req.body.user,
    customer_mobile_no: req.body.customer_mobile_no,
    company_name:req.body.company_name,
    date:req.body.date,
    customer_name: req.body.customer_name,
    email:req.body.email,
    reference:req.body.reference,
    level:req.body.level,
    address: req.body.address,
    comments:req.body.comments,
    user_id:decode.uuid,
    lead_id:lead_id,
    index:req.body.index,
    assignedto:"",
})

saveLead.save().then((ss)=>{
  try {
    console.log("data inserted")
    res.send({"status":"ok"})
  } catch (error) {
    console.log(err)
  }
})
}else{
  console.log(err)
}
})}}


exports.leadAddBulk=(req,res)=>{


  let token ;
  const {authorization} = req.headers
  if(authorization && authorization.startsWith('Bearer')){
  token = authorization.split(' ')[1]
  jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
  if(!err){
    const lead_id = uuidv4()
    for (let i = 0; i < req.body.data.length; i++) {
      const element = req.body.data[i];
if(req.body.data[i].status!==""&& req.body.data[i].source && req.body.data[i].user!=="" &&req.body.data[i].customer_mobile_no!=="" && req.body.data[i].company_name!=="" && req.body.data[i].date!==null && req.body.data[i].customer_name!==""){
   const saveLead = new  lead_model.leadModel(
      {
      status:req.body.data[i].status,
      source:req.body.data[i].source,
      user:req.body.data[i].user,
      customer_mobile_no:req.body.data[i].customer_mobile_no,
      company_name:req.body.data[i].company_name,
      date:  req.body.data[i].date,
      customer_name: req.body.data[i].customer_name,
      email:req.body.data[i].email,
      reference: req.body.data[i].reference,
      level: [],
      index:0,
      address: req.body.data[i].address,
      comments:req.body.data[i].comments,
      user_id: decode.uuid,
      lead_id: uuidv4(),
      assignedto:"",
    },)
    saveLead.save();
}} 
  res.send({"resuld":"ok"})
  }
})
  }
  }





exports.retriveLead = async(req,res)=>{
  console.log(req.body)
let newData =null;
let processingData =null;
let closeBy =null;
let confirm =null;
let cancel =null;
let alldata =null;
const  {authorization} = req.headers
if(authorization && authorization.startsWith('Bearer')){
  try {
   let token = authorization.split(' ')[1]
console.log(token)
    jwt.verify(token,process.env.SECKRET_KEY, function(err, decoded) {
      console.log(decoded)
   if(!err){
  
   lead_model.leadModel.find({"user_id":decoded.uuid,"status":"New"}).then((ss)=>{
    newData=ss
}).then(async()=>{
    lead_model.leadModel.find({"user_id":decoded.uuid,"status":"Processing"}).then((ss)=>{
   processingData = ss
}).then(async()=>{
     lead_model.leadModel.find({"user_id":decoded.uuid,"status":"Closed_By"}).then((ss)=>{
    closeBy = ss
}).then(async()=>{
 lead_model.leadModel.find({"user_id":decoded.uuid,"status":"Confirm"}).then((ss)=>{
    confirm=ss
}).then(async()=>{

    lead_model.leadModel.find({"user_id":decoded.uuid,"status":"Cancel"}).then((ss)=>{
    cancel=ss
}).then(async()=>{
  lead_model.leadModel.find({"user_id":decoded.uuid}).then((ss)=>{
alldata=ss
  }).then(async()=>{
    res.send({"newData":newData,"newdata_length":newData.length,"processingData":processingData,"closeBy":closeBy,"confirm":confirm,"cancel":cancel,"alldata":alldata})

  })
    
})})})})})
 }else{
  console.log(err)
 }
});
} catch (error) {
    
  }
}
}


exports.deleteLead = async(req,res)=>{
  
  let token ;
  const {authorization} = req.headers
  if(authorization && authorization.startsWith('Bearer')){
  token = authorization.split(' ')[1]
  jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
  if(!err){

lead_model.leadModel.deleteMany({"user_id":decode.uuid,"lead_id":req.body.lead_id}).then((result)=>{
if(result.acknowledged==true && result.deletedCount>0){
  res.send({"result":"ok","data":result})  
}else{
    res.send({"data":"nothing delated"})
}})}})}}


exports.updateLead = (req,res)=>{

  let token ;
  const {authorization} = req.headers
  if(authorization && authorization.startsWith('Bearer')){
  token = authorization.split(' ')[1]
  jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
  if(!err){
  lead_model.leadModel.updateMany({"user_id":decode.uuid,"lead_id":req.body.id},{status:req.body.status}).then((s)=>{
res.send({"ok":"value"})
  })
}})}}


exports.addTag = (req,res)=>{

  let token ;
  const {authorization} = req.headers
  if(authorization && authorization.startsWith('Bearer')){
  token = authorization.split(' ')[1]
  jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
  if(!err){
  lead_model.leadModel.updateOne({"user_id":decode.uuid,'lead_id':req.body.id}, {'$push': {'level': { id:req.body.da.id, value:req.body.da.name, bgcolor:""}}}).then((e)=>{
 res.send({"ok":"succesful"})
})

  }
})
  }
}




exports.deleteTag =(req,res)=>{
//console.log(req.body)

let token ;
  const {authorization} = req.headers
  if(authorization && authorization.startsWith('Bearer')){
  token = authorization.split(' ')[1]
  jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
  if(!err){
lead_model.leadModel.updateMany({"user_id":decode.uuid,'lead_id':req.body.id}, {'$pull': {'level': { id:req.body.da.id}}}).then((e)=>{
  res.send({"oh":"oj"})
})
  }
})
  }
}




exports.updatedTagdata =(req,res)=>{
  //console.log(req.body)
  
  let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){
  lead_model.leadModel.findOne({"user_id":decode.uuid,'lead_id':req.body.id}).then((e)=>{
    res.send({"data":e})
  })
    }
  })
    }
  }






exports.updateAndArrageData=(req,res)=>{

  let token ;
  const {authorization} = req.headers
  if(authorization && authorization.startsWith('Bearer')){
  token = authorization.split(' ')[1]
  jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
  if(!err){

for (let i = 0; i < req.body.data.length; i++) {
  console.log(req.body.data[i].lead_id)
   lead_model.leadModel.updateOne({"user_id":decode.uuid,"lead_id":req.body.data[i].lead_id},{status:req.body.destination.droppableId,index:i}).then((s)=>{
   
      })
} 
  res.send({"ok":"value"})

  }
})
  }
}



exports.bulkDelete = async(req,res)=>{
  let token ;
  const {authorization} = req.headers
  if(authorization && authorization.startsWith('Bearer')){
  token = authorization.split(' ')[1]
  jwt.verify(token,process.env.SECKRET_KEY,async(err,decode)=>{
  if(!err){
 for (let i = 0; i < req.body.data.length; i++) {
 await lead_model.leadModel.deleteOne({"user_id":decode.uuid,"lead_id":req.body.data[i].lead_id}).then(()=>{
  })
  
 }
  res.send({"es":''})
  }
})
  }

}




exports.updateLeadAll = (req,res)=>{

  let token ;
  const {authorization} = req.headers
  if(authorization && authorization.startsWith('Bearer')){
  token = authorization.split(' ')[1]
  jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
  if(!err){
   
  lead_model.leadModel.updateMany({"user_id":decode.uuid,"lead_id":req.body.id},{
    status:req.body.status,
    source:req.body.source,
    user: req.body.user,
    customer_mobile_no: req.body.customer_mobile_no,
    company_name:req.body.company_name,
    date:req.body.date,
    customer_name: req.body.customer_name,
    email:req.body.email,
    reference:req.body.reference,
    address: req.body.address,
    comments:req.body.comments,

  }).then((s)=>{
    if(s.acknowledged==true && s.modifiedCount > 0){
res.send({"ok":"value"})
    }

  })
}})}}


exports.bulkDeleteforsecondpage = async(req,res)=>{
  console.log(req.body)
  let token ;
  const {authorization} = req.headers
  if(authorization && authorization.startsWith('Bearer')){
  token = authorization.split(' ')[1]
  jwt.verify(token,process.env.SECKRET_KEY,async(err,decode)=>{
  if(!err){
 for (let i = 0; i < req.body.data.length; i++) {
 await lead_model.leadModel.deleteOne({"user_id":decode.uuid,"lead_id":req.body.data[i]}).then(()=>{
  })
 }
  res.send({"es":''})
  }
})
  }

}



exports.assignedtoupdate = (req,res)=>{
  let token ;
  console.log(req.body)
  const {authorization} = req.headers
  if(authorization && authorization.startsWith('Bearer')){
  token = authorization.split(' ')[1]
  jwt.verify(token,process.env.SECKRET_KEY,async(err,decode)=>{
  if(!err){
 await lead_model.leadModel.updateMany({"user_id":decode.uuid,"lead_id":req.body.alldata.lead_id},{ "assignedto":req.body.name,}).then((s)=>{

  if(s.modifiedCount>0 && s.acknowledged==true){
 res.send({"es":''})
  }
  })
  }
})
  }


}
