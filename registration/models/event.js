const mongoose = require('mongoose')
const Schema  = mongoose.Schema


const eventSchema = new Schema({
    event_id:String,
    user_id:String,
    name:String,
    date:Date,
    description:String
})


exports.eventmodel = mongoose.model('event',eventSchema)