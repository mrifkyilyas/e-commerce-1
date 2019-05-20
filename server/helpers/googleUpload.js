'use strict'

exports.getPublicUrl = (bucketName, fileName) => `http://storage.googleapis.com/${bucketName}/${fileName}`


// exports.copyFileToGCS = (localFilePath, bucketName, options) => {
//  options = options || {};
//  const bucket = storage.bucket(bucketName)
//  const fileName = path.basename(localFilePath)
//  const file = bucket.file(fileName)
//  return bucket.upload(localFilePath,options)
//  .then(()=>file.makePublic())
//  .then(()=>exports.getPublicUrl(bucketName,gcsName))

// }