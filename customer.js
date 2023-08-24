const cust_model = require('./registration/models/customer')
const jwt = require('jsonwebtoken')


exports.addCustomer = (req,res)=>{
    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 

//// for cheaking customer alredt exist in customer or not

cust_model.customerModel.find({'user_id':decode.uuid,'customer_id':req.body.data.lead_id}).then((da)=>{

    if(da.length> 0){
        res.send({"data":"customer already registerd"})
    }else{
const customerAdd = new cust_model.customerModel({
status:req.body.data.status,
    source:req.body.data.source,
    user: req.body.data.user,
    customer_mobile_no: req.body.data.customer_mobile_no,
    company_name:req.body.data.company_name,
    date:req.body.data.date,
    customer_name: req.body.data.customer_name,
    email:req.body.data.email,
    reference:req.body.data.reference,
    level:req.body.data.level,
    address: req.body.data.address,
    comments:req.body.data.comments,
    user_id:decode.uuid,
    customer_id:req.body.data.lead_id,
    is_customer_active:true,
    is_noteadded:false,
    is_reminderset:false
})
    customerAdd.save().then((ss)=>{
res.send({"data":"added"})
    })
    }
})


}
    })
}

}


exports.retriveCustomer = (req,res)=>{
console.log("okkk")
    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 
        let allcostomer;
        let activecostomer;
        let inactivecostomer;
    cust_model.customerModel.find({"user_id":decode.uuid}).then((s)=>{
       allcostomer=s
    }).then(()=>{
        cust_model.customerModel.find({"user_id":decode.uuid,'is_customer_active':true}).then((d)=>{
           activecostomer=d
        }).then((dd)=>{
            cust_model.customerModel.find({"user_id":decode.uuid,'is_customer_active':false}).then((sss)=>{
               inactivecostomer=sss
            }).then(()=>{
                res.send({"allcustomer":allcostomer,"active":activecostomer,'inactive':inactivecostomer})
                
            })
        })
    })
    }})
    }

}





exports.updateCostomer = (req,res)=>{
    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 
cust_model.customerModel.updateMany({"user_id":decode.uuid,"customer_id":req.body.customer_id},{
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
}).then((s)=>{
 if(s.acknowledged==true && s.modifiedCount > 0){
    res.send({"result":"ok"})
 }

})}})  }}




exports.deactivecontomer=(req,res)=>{
    let token ;
const {authorization} = req.headers
if(authorization && authorization.startsWith('Bearer')){
token = authorization.split(' ')[1]
jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
if(!err){ 
    cust_model.customerModel.updateMany({"user_id":decode.uuid,"customer_id":req.body.id},{"is_customer_active":false}).then((s)=>{
if(s.acknowledged==true && s.modifiedCount>0){
    res.send({"ok":"ok"})
}
    })}})}}




    exports.activatecostomerfromdeactive=(req,res)=>{
        console.log(req.body)
        let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 
        cust_model.customerModel.updateMany({"user_id":decode.uuid,"customer_id":req.body.id},{"is_customer_active":true}).then((s)=>{
    if(s.acknowledged==true && s.modifiedCount>0){
        res.send({"ok":"ok"})
    }
        })}})}}



