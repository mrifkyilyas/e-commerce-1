const router = require('express').Router()

const user = require('../controllers/user')
const authentication = require('../middleware/authentication')



router.get('/',authentication,user.getCart)
router.patch('/addtocart',authentication,user.addToCart)
router.patch('/removefromcart',authentication,user.removeFromCart)





module.exports = router