const mongoose =require('mongoose')
const Schema =mongoose.Schema

const registrationSchema = new Schema({
    first_name:String,
   last_name:String,
     email:String,
   phone_no:Number  ,  
     company_name:String,
     gst_no  :String,
     password :String,
     conf_password :String,
     time_zone :String,
     price :Number,
     max_user :Number,
      plan_type :String,
     plan_id :Number,
     date :Date,
     razorpay_payment_id :String,
     uuid :String,
     profile_url:String,
})

exports.registrationModel = mongoose.model('registration',registrationSchema)
