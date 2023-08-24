const notication_Model = require('../registration/models/notification')
const jwt  = require('jsonwebtoken')
exports.retriveNotification = (req,res)=>{
    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 
     notication_Model.noticationModel.find({"uuid":decode.uuid}).then((data)=>{
res.send({"data":data})
     })
    }
})
    }

}