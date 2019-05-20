const router = require('express').Router()
const user = require('../controllers/user')
const authentication = require('../middleware/authentication')


router.post('/register',user.register)
router.post('/rahasia/hidden/adminregister',user.registerAdmin)
router.post('/login',user.login)





module.exports = router