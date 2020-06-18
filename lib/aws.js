const AWS = require('aws-sdk')
const fs = require('fs')
const { getFileNameFromPath } = require('./files')

const s3 = new AWS.S3() // Pass in opts to S3 if necessary

const s3Params = {
  Bucket: 'lcloud-427-ts',
  Delimiter: '/'
}

exports.listAllFiles = function () {
  return new Promise((resolve, reject) => {
    s3.listObjects(s3Params, (err, data) => {
      if (err) {
        return reject(err)
      }

      resolve(data.Contents)
    })
  })
}

exports.uploadFile = function (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, function (err, fileData) {
      const params = {
        Body: fileData,
        Key: getFileNameFromPath(filePath)
      }

      if (err) {
        return reject(err)
      }

      s3.upload({ ...s3Params, ...params }, (err, s3Data) => {
        if (err) {
          return reject(err)
        }

        resolve(s3Data.Location)
      })
    })
  })
}
