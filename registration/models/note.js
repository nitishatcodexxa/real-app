const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = new Schema({
notes : String,
date:Date,
type:String,
note_id:String,
user_id:String
})

exports.noteModel=new mongoose.model('note',noteSchema)