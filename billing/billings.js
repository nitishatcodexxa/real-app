const billing_model = require('../registration/models/billingDetails')
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')
exports.uploadBillingData=(req,res)=>{
    console.log(req.body)
const {authorization} = req.headers

if(authorization && authorization.startsWith('Bearer')){
    const token = authorization.split(' ')[1]
    console.log(token)
jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){
        console.log(decode)
         const bill = new   billing_model.billingmodel({
    billing_id:uuidv4(),
    amount:req.body.amount,
    package:req.body.package,
    purchaseDate:req.body.date,
    uuid:decode.uuid,
    })

    bill.save().then((s)=>{
res.send({"ok":"ok"})
    })
    }
})}}


exports.billingDataRetrived=(req,res)=>{
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
        const token = authorization.split(' ')[1]
        jwt.verify(token,process.env.SECKRET_KEY ,((err,decode)=>{
if(!err){
    billing_model.billingmodel.find({"uuid":decode.uuid}).then((data)=>{
    res.send({"data":data})
})
}

        }))
    }
}






