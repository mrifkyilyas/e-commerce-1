const Product = require('../models/product')

class productController {
    static getProducts(req, res) {
        Product
            .find({})
            .then((products) => {
                res.status(200).json(products)

            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }
    static getOneProduct(req, res) {
        Product
            .findById(req.params.id)
            .then(found => {
                if (!found) {
                    res.status(404).json({
                        msg: 'not Found.'
                    })
                } else {
                    res.status(200).json(found)
                }
            })
            .catch(err => {
                res.status(500).json({
                    msg: err
                })
            })
    }

    static createProduct(req, res) {
        console.log(req.body)
        if (req.file) {
            req.body.image = req.file.gcsUrl
        }
        const { name, quantity, image, price } = req.body
        Product
            .create({ name, quantity, image, price })
            .then((product) => {
                res.status(201).json(product)
            })
            .catch((err) => {
                if (err.errors.name) {
                    res.status(400).json({
                        msg: err.errors.name.message
                    })

                } else if (err.errors.quantity) {
                    res.status(400).json({
                        msg: err.errors.quantity.message
                    })
                } else if (err.errors.image) {
                    res.status(400).json({
                        msg: err.errors.image.message
                    })
                } else if (err.errors.price) {
                    res.status(400).json({
                        msg: err.errors.price.message
                    })
                } else {
                    res.status(500).json(err)
                }
            })

    }

    static updateProduct(req, res) {
        if (req.file) {
            req.body.image = req.file.gcsUrl
            
        }
       
        Product
            .findById(req.params.id)
            .then(found => {
                if (!found) {
                    res.status(404).json({
                        msg: 'not Found.'
                    })
                } else {
                    return Product.findByIdAndUpdate(req.params.id, {
                        ...req.body
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

    static delete(req, res) {
        Product
            .findById(req.params.id)
            .then(found => {
                if (!found) {
                    res.status(404).json({
                        msg: 'not Found.'
                    })
                } else {
                    return Product.findByIdAndDelete(req.params.id)
                }
            })
            .then(deleted => {
                res.status(200).json(deleted)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }


}

module.exports = productController