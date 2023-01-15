const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    Title:String,
    Description:String,
    Price:Number,
    ImageUrl:String,
    Quantity:Number,
    UserID:String
})

const productModel = mongoose.model('Product' , productSchema);

module.exports = {productModel}