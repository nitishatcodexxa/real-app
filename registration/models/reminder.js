const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reminderSchema = new Schema({
type:String,
date:Date,
email:String,
whatsapp_no:Number,
user_name:String,
user_id:String,
reminder_id:String,
message:String,
is_email:Boolean,
is_whatsappno:Boolean
})

exports.reminderModel=new mongoose.model('reminder',reminderSchema)