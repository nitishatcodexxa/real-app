const mongoose =require('mongoose')
const Schema =mongoose.Schema

const customerSchema = new Schema({
status:String,
source:String,
user:String,
customer_mobile_no:Number,
company_name:String,
date:Date,
customer_name:String,
email:String,
reference:String,
level:[{
    id:String,
    value:String,
    bgcolor:String
}],
address:String,
comments:String,
user_id:String,
customer_id:String,
is_customer_active:Boolean,
is_noteadded:Boolean,
is_reminderset:Boolean
})
exports.customerModel = mongoose.model('customer',customerSchema)