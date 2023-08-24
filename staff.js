const staff_model =require('./registration/models/staff')
const { v4: uuidv4 } = require('uuid');
const jwt =require('jsonwebtoken')


exports.staff_add = (req,res)=>{

    console.log(req.body)
    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){
  const staff = new staff_model.staffModel({
    name:req.body.name,
    value:req.body.name,
    staff_id:uuidv4(),
    uuid:decode.uuid
  })
  staff.save().then((ss)=>{
    res.send({"ok":"dd"})
  })
 }
})}
}



exports.staff_retrive = (req,res)=>{
    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){

    staff_model.staffModel.find({"uuid":decode.uuid}).then((dd)=>{
        res.send({"data":dd})
    })
    }
})
    }
}


exports.staff_update =(req,res)=>{
   console.log(req.body)
    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){

staff_model.staffModel.updateOne({"staff_id":req.body.id},{"name":req.body.name}).then((ss)=>{
    res.send({"ss":"ss"})
})



    }
})
    }
}




exports.staff_delete=(req,res)=>{
    console.log(req.body)
    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){

staff_model.staffModel.deleteOne({"staff_id":req.body.id}).then((ss)=>{
    res.send({"ss":"ss"})
})



    }
})
    }
}