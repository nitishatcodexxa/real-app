const mongoose  = require('mongoose')
const Schema =mongoose.Schema

const taskSchema = new Schema({
subject:String,
priority:String,
assigned_to:String,
start_date:Date,
end_date:Date,
date:Date,
recursion_type:String,
status:String,
description:String,
file:[{id:Number,
    url:String
}],
task_id:String,
user_id:String,
recursion_is:Boolean,
created_by:String,

})


exports.taskModel = mongoose.model('task',taskSchema)