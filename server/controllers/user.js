const { User } = require('../models')
const bcrypt = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')
const {Mailer} = require('../helpers/nodemailer')
class userController {
    static register(req, res) {
        let { name, email, password, address } = req.body
        User.create({
            name, email, password, address
        })
            .then(success => {
                let email = {
                    receiver : success.email,
                    subject:`selamat datang di Outdoors`,
                    text:`halo ${success.name} Selamat datang di Outdoors,
                    Selamat berbelanja, dan koleksi barang berkualitas kami!`
                }
                res.status(201).json(success)
                return Mailer(email)  
            })
            .catch(err => {
                if (err.errors.name) {
                    res.status(400).json({
                        message: err.errors.name.message
                    })
                } else if (err.errors.email) {
                    res.status(400).json({
                        message: err.errors.email.message
                    })
                } else if (err.errors.password) {
                    res.status(400).json({
                        message: err.errors.password.message
                    })
                } else {
                    res.status(500).json(err)
                }
            })
    }


    static registerAdmin(req, res) {
        req.body.role = 'admin'
        let { name, email, password, address, role } = req.body
        User.create({
            name, email, password, address, role
        })
            .then(success => {
                res.status(201).json(success)
            })
            .catch(err => {
                if (err.errors.name) {
                    res.status(400).json({
                        message: err.errors.name.message
                    })
                } else if (err.errors.email) {
                    res.status(400).json({
                        message: err.errors.email.message
                    })
                } else if (err.errors.password) {
                    res.status(400).json({
                        message: err.errors.password.message
                    })
                } else {
                    res.status(500).json(err)
                }
            })
    }

    static login(req, res) {
        User.findOne({
            email: req.body.email
        })
            .then(found => {
                if (found && bcrypt.compare(req.body.password, found.password)) {
                    let access_token = jwt.sign({
                        email: found.email,
                        id: found._id,
                        role: found.role,
                        name: found.name
                    })
                    res.status(200).json({
                        access_token, name: found.name, email: found.email, role: found.role
                    })

                } else {
                    res.status(400).json({
                        message: 'password yang anda masukan salah'
                    })
                }
            })
            .catch(err => {
                res.status(500).json({ message: 'password yang anda masukan salah' })
            })
    }

    static addToCart(req, res) {
        User
            .findByIdAndUpdate(req.islogin.id, {
                $push: { cart: req.body.productId }
            }, { new: true })
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }
    static removeFromCart(req, res) {
        User
            .findByIdAndUpdate(req.islogin.id, {
                $pull: { cart: req.body.productId }
            }, { new: true })
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static getCart(req, res) {
        const email = req.islogin.email
        User.findOne({
            email
        })
        .populate('cart')
            .then(found => {
                res.status(200).json(found)
            })
            .catch(err => {
                res.status(500).json(err)
            })

    }



}

module.exports = userController