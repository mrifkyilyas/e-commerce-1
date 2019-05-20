const router = require('express').Router()
const user = require('./user')
const product = require('./product')
const cart = require('./cart')
const transaction = require('./transaction')



router.use('/product',product)
router.use('/user',user)
router.use('/cart',cart)
router.use('/transaction',transaction)






module.exports = router