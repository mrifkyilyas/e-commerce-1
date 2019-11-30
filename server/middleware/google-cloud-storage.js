const gcsHelpers  = require('../helpers/googleUpload')
const DEFAULT_BUCKET_NAME = process.env.bucket
require('dotenv').config()
const GoogleCloudStorage = require('@google-cloud/storage');



const GOOGLE_CLOUD_PROJECT_ID = process.env.googleId; // Replace with your project ID
const GOOGLE_CLOUD_KEYFILE = process.env.keyfile; // Replace with the path to the downloaded private key



const storage = new GoogleCloudStorage.Storage({

    projectId: GOOGLE_CLOUD_PROJECT_ID,

    keyFilename: GOOGLE_CLOUD_KEYFILE,

});




exports.sendUploadToGCS = (req, res, next) => {
    if (!req.file) {
      
        return next();
    }


    const bucketName = req.body.bucketName || DEFAULT_BUCKET_NAME
    const bucket = storage.bucket(bucketName)
    const gcsFileName = `${Date.now()}-${req.file.originalname}`
    const file = bucket.file(gcsFileName)

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    });

    stream.on('error', (err) => {
        req.file.cloudStorageError = err
        next(err)
    })

    stream.on('finish', () => {
        req.file.cloudStorageObject = gcsFileName
        return file.makePublic()
            .then(() => {
                req.file.gcsUrl = gcsHelpers.getPublicUrl(bucketName, gcsFileName)

                next()
            })
    })
    stream.end(req.file.buffer)
}
