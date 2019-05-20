const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('../helpers/bcrypt')

let userSchema = new Schema({
    name: {
        type: String,
        required: [true,"nama harap diisi"]
    },
    password: {
        type: String,
        required: [true,"password tidak boleh kosong"],
        minlength: [5, "password harus lebih dari 5 character"]
    },
    email: {
        type: String,
        required: true,
        validate: [
            {
                validator: function emailValidate(value) {
                    return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value)
                },
                message: "format email salah"
            },
            {
                validator: async function unique(value) {
                    let found = await User.findOne({ email: value })
                    if (found && found._id.toString() !== this._id.toString()) {
                        return false
                    } else {
                        return true
                    }
                },
                message: "email sudah digunakan"

            }
        ]
    },
    role: {
        type: String,
        default: 'customer'
    },
    address: {
        type: String,
        default: null
    },
    cart: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
})

userSchema.pre('save', function (next) {
    this.email = this.email.toLowerCase()
    let temp = bcrypt.hash(this.password)
    this.password = temp
    next()
})

const User = mongoose.model('User', userSchema)


module.exports = User