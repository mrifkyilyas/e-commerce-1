const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = ({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    phone: {
        type: String,
        required: true,
        minlength: [10, 'invalid phone number'],
        maxlength: [12, 'invalid phone number'],
        validate: {
            validator: function phoneCheck(value) {
                return /^\d+$/.test(value)
            },
            message: "invalid phone number"
        }
    },
    address: {
        type: String,
        required: true,
        validate: {
            validator: function addressCheck(value) {
                return /^[a-zA-Z0-9\s,.'-]{3,}$/.test(value)
            },
            message: "invalid address format"
        }
    },
    totalPayment: {
        type: Number,
        default: null
    },
    status: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    productList: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
})

const Transaction = mongoose.model('Transaction', transactionSchema)


module.exports = Transaction