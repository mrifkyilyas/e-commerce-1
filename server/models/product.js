const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'nama tidak boleh kosong']
    },
    quantity: {
        type: Number,
        required: [true, 'quantity harap diisi']
    },
    image: {
        type: String,
        required: [true, 'image harus ada']
    },
    price: {
        type: Number,
        required: [true, 'harga harap diisi']
    },

},
    {
        timestamps: {}
    })


const Product = mongoose.model('Product', ProductSchema)
module.exports = Product