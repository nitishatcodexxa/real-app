const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationSchema = new Schema({
date:Date,
reminder_id:String,
uuid:String,
notification_text:String,
notification_id:String
})

exports.noticationModel = mongoose.model('notification',notificationSchema)