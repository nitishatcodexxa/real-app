const mongoose = require('mongoose')
const Schema = mongoose.Schema

const staffSchema = new Schema({
    name:String,
   staff_id:String,
    uuid:String,
    value:String,
})


exports.staffModel = mongoose.model('staff',staffSchema)