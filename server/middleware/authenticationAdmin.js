
module.exports = function (req, res, next) {
    if (req.islogin.role !== 'admin') {
        res.status(401).json({
            msg: "not allowed! you are not admin!!"
        })
    } else {
        next()
    }
}