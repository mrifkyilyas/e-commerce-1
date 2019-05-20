const Transaction = require('../models/transaction')

module.exports = function (req, res, next) {
    try {
        Transaction
            .findById(req.params.id)
            .then(found => {
                if (found) {
                    if (found.userId.toString() === req.islogin.id.toString()) {
                        next()
                    } else {
                        res.status(401).json({
                            msg: 'not allowed!'
                        })
                    }
                } else {
                    res.status(404).json({
                        msg: 'not Found.'
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    } catch (err) {
        res.status(400).json({
            message: 'Bad request'
        })
    }
}