const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ProductScheme = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
})

const Product = mongoose.model('product', ProductScheme)
module.exports = Product;