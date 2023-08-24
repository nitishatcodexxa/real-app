var connection = require('../connection/config')
var jwt = require('jsonwebtoken');
require('dotenv').config()
const reg_model = require('../registration/models/registration')


exports.getLogin=(req,res)=>{  
var email = req.body.email;
var password = req.body.password

reg_model.registrationModel.findOne({ "email":email,"password":password}).then((data)=>{
try {
    if(email===data.email && password===data.password){
        var token = jwt.sign({ email:data.email,password:data.password,uuid:data.uuid},process.env.SECKRET_KEY);
      res.json({"token":token,"result":data})
    }
} catch (error) {
    
}
})


}