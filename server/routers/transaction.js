const router = require('express').Router()
const Transaction = require('../controllers/transaction')
const authentication = require('../middleware/authentication')
const authAdmin = require('../middleware/authenticationAdmin')
const authTrans = require('../middleware/authorizationTransaksi')
const { getCityId } = require('../middleware/getCityId')

router.post('/delivery', getCityId,Transaction.delivery)
router.post('/checkout',authentication,Transaction.checkout)
router.get('/',authentication,authAdmin ,Transaction.findAll)
router.patch('/:id',authentication,authTrans,Transaction.updateStatus)
router.get('/mytransaction',authentication,Transaction.findByUser)










module.exports = router