const event_model = require('../registration/models/event')
const { v4: uuidv4 } = require('uuid');
const jwt  = require('jsonwebtoken')



exports.addEvent = (req,res)=>{
    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){
const addeven = new event_model.eventmodel({
    event_id:uuidv4(),
    user_id:decode.uuid,
    name:req.body.name,
    date:req.body.date,
    description:req.body.description
})

addeven.save().then((s)=>{
res.send({"data":"saved"})
})
    
}})}
}



exports.sendRetrived=(req,res)=>{
    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){
event_model.eventmodel.find({"user_id":decode.uuid}).then((data)=>{
    res.send({"data":data})
})
    }})}

}