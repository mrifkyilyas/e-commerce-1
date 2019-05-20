const router = require('express').Router()
const product = require('../controllers/product')
const authentication = require('../middleware/authentication')
const authenticationAdmin = require('../middleware/authenticationAdmin')
const Multer = require('multer')
const path = require('path')
const gcsMiddleware = require('../middleware/google-cloud-storage')


const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 10 * 1024 * 1024 // maximum file 10mb
    },
    fileFilter : function(req, file , inst){
        var extFile = path.extname(file.originalname);
        if(extFile !== ".jpg" && extFile !== ".jpeg" && extFile !== ".png" && extFile !== ".gif"){           
            // skip uploadnya
            console.log('skip')
            inst(null, false)
        } else {
            console.log('masuk')
            inst(null, true)
        }
    }
    
})



router.get('/',product.getProducts)
router.get('/:id',product.getOneProduct)
router.post('/',authentication,authenticationAdmin ,multer.single('file'), gcsMiddleware.sendUploadToGCS,product.createProduct)
router.patch('/:id',authentication,authenticationAdmin,product.updateProduct)
router.delete('/:id',authentication,authenticationAdmin,product.delete)



module.exports = router