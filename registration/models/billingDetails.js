const mongoose = require('mongoose')
const Schema = mongoose.Schema


const billingDetailsSchema = new Schema({
    billing_id:String,
    amount:String,
    package:String,
    purchaseDate:Date,
    uuid:String,

});


exports.billingmodel = mongoose.model('billing',billingDetailsSchema)