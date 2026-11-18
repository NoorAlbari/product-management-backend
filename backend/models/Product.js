const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        
    },
    price:{
        type: Number,
        required: true,
        min: [0,'Age must be above 0']
    },
    discription:{
        type:String
    },
},{timestamps: true})


const Product = mongoose.model('Product',productSchema)

module.exports = Product