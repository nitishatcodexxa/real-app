const reg_Model = require('../registration/models/registration')
const { v4: uuidv4 } = require('uuid');
const jwt =require('jsonwebtoken')


exports.cheakRegistration=(req,res,next)=>{   /// cheak code for ehether user exist with us or not
   const email = req.body.email
reg_Model.registrationModel.findOne({email:email}).then((s)=>{
try {
   if(s){
      
res.send({"status":"user already registred"})
   }else{
      next()
   }
} catch (error) {
   console.log(error)
}
})
   
}

//res.send({"status":"user already registred"})

exports.allowRegistration=(req,res)=>{   /// code for registration
   let first_name=req.body.first_name;
   let last_name= req.body.last_name;
   let email=req.body.email;
const phone_no = req.body.phone_no;      
   const company_name= req.body.company_name;
  const  gst_no= req.body.gst_no;
   const password =  req.body.password;
  const  conf_password =req.body.conf_password;
  const  time_zone = req.body.time_zone;
  const  price = req.body.price;
 const   max_user = req.body.max_user;
   const  plan_type =req.body.plan_type;
  const  plan_id = req.body.plan_id;
  var date  = req.body.date;
  const  razorpay_payment_id = req.body.razorpay_payment_id;
var uuid = uuidv4();
const reg = new reg_Model.registrationModel({
   first_name:first_name,
   last_name:last_name,
     email:email,
   phone_no:phone_no ,  
     company_name:company_name,
     gst_no  :gst_no,
     password :password,
     conf_password :"",
     time_zone :time_zone,
     price :price,
     max_user :max_user,
      plan_type :plan_type,
     plan_id :plan_id,
     date :date,
     razorpay_payment_id :razorpay_payment_id,
     uuid :uuid
})

reg.save().then(async(ss)=>{
try {
   var token = jwt.sign({ email:email,password:password,uuid:uuid},process.env.SECKRET_KEY);
   await reg_Model.registrationModel.findOne({"email":email,"password":password}).then((data)=>{
      
       res.send({"token":token,"result":data,"register":"ok"})
   })
   

} catch (error) {
   console.log(error)
}
 
})}




exports.profileUpdate = (req,res)=>{
  
const {authorization} = req.headers;
if(authorization && authorization.startsWith('Bearer')){
const token = authorization.split(' ')[1]
jwt.verify(token,process.env.SECKRET_KEY,((err,decode)=>{
if(!err){
reg_Model.registrationModel.findOne({"email":decode.email,"password":decode.password}).then((data)=>{
if(data){
   if(req.files.file&& req.files.file.length){
    reg_Model.registrationModel.updateOne({"uuid":decode.uuid},{"email":req.body.email,"password":req.body.password,"profile_url":req.files.file[0].filename,"first_name":req.body.firstname,"last_name":req.body.lastname,"gst_no":req.body.gstno,"phone_no":req.body.phone}).then((updated)=>{
  if(updated.acknowledged==true && updated.modifiedCount >0){
   reg_Model.registrationModel.findOne({"uuid":decode.uuid}).then((data)=>{
       res.send({"result":data})
       console.log(data)
   })
  }
   

})
   }else{
      reg_Model.registrationModel.updateOne({"uuid":decode.uuid},{"email":req.body.email,"password":req.body.password,"first_name":req.body.firstname,"last_name":req.body.lastname,"gst_no":req.body.gstno,"phone_no":req.body.phone}).then((updated)=>{

         if(updated.acknowledged==true && updated.modifiedCount >0){
            reg_Model.registrationModel.findOne({"uuid":decode.uuid}).then((data)=>{
            res.send({"result":data})
            console.log(data)
        }) 
         }
      }) 
   }
  

}})}}))
}

}





exports.passwordUpdate = (req,res)=>{

const {authorization} = req.headers
if(authorization && authorization.startsWith('Bearer')){
   let token = authorization.split(' ')[1]
jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
if(!err){
reg_Model.registrationModel.findOne({uuid:decode.uuid}).then((data)=>{
if(data.email==req.body.email && data.password==req.body.oldpassword){
   reg_Model.registrationModel.updateOne({uuid:decode.uuid},{"password":req.body.newpassword}).then((e)=>{
if(e.acknowledged==true && e.modifiedCount >0){
   reg_Model.registrationModel.findOne({"uuid":decode.uuid}).then((data)=>{
      res.send({"result":data})
   
  }) 

}})}})}})}






}
