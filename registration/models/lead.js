const mongoose =require('mongoose')
const Schema =mongoose.Schema

const leadSchema = new Schema({
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
lead_id:String,
assignedto:String,
index:Number,
})
exports.leadModel = mongoose.model('lead',leadSchema)
