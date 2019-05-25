
const { User, Transaction, Product } = require('../models')
const axios = require('axios')

class transactionController {
    static async delivery(req, res) {
        try {
            if (req.body.cityId === null) {
                throw new Error("404")
            } else {
                let { data } = await axios.post('https://api.rajaongkir.com/starter/cost', {
                    origin: 155,
                    destination: req.body.cityId,
                    weight: 2000,
                    courier: "jne"
                }, {
                        headers: {
                            key: process.env.APIKEY
                        }
                    })
                res.status(201).json(data.rajaongkir.results[0].costs[0].cost[0].value)
            }
        } catch (err) {
            // console.log(err.message)
            if (err.message === "404") {
                res.status(404).json({
                    msg: 'the address you provided was not found'
                })
            } else {
                res.status(500).json({
                    msg: err.message
                })
            }
        }
    }
    static async checkout(req, res) {
        try {
            console.log(req.islogin.id)
            var user = await User.findById(req.islogin.id)
            if (!user) {
                res.status(404).json({
                    msg: 'not Found.'
                })
            } else {
                user.cart.map(async (e) => {
                    let product = await Product.findById(e._id)
                    let quantity = product.quantity
                    let newquantity = quantity -= 1
                    await Product.findByIdAndUpdate(e._id, {
                        quantity: newquantity
                    }, { new: true, useFindAndModify: false })
                })

                let transaction = await Transaction.create({
                    userId: req.islogin.id,
                    phone: req.body.phone,
                    address: req.body.address,
                    totalPayment: req.body.totalPayment,
                    productList: user.cart
                })
                await User.findByIdAndUpdate(req.islogin.id, {
                    cart: []
                }, { new: true })
                res.status(201).json(transaction)
            }
        } catch (err) {
            if (err.errors.phone) {
                res.status(400).json({
                    msg: err.errors.phone.message
                })
            }
            else {
                res.status(500).json({
                    msg: err.message
                })
            }
        }
    }

    static findAll(req, res) {
        Transaction
            .find({})
            .populate('productList')
            .populate('userId')
            .then(transactions => {
                res.status(200).json(transactions)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static findByUser(req, res) {
        Transaction
            .find({
                userId: req.islogin.id
            })
            .populate("productList")
            .populate("userId")
            .then(found => {
                res.status(200).json(found)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static updateStatus(req, res) {
        console.log('masuk')
        Transaction
            .findById(req.params.id)
            .then(found => {
                if (!found) {
                    res.status(404).json({
                        msg: 'not Found.'
                    })
                } else {
                    return Transaction
                        .findByIdAndUpdate(req.params.id, {
                            status: req.body.status
                        }, { new: true })
                }
            })
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }
}

module.exports = transactionController