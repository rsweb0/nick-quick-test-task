var AWS = require('aws-sdk')

const s3 = new AWS.S3() // Pass in opts to S3 if necessary

const s3Params = {
  Bucket: 'lcloud-427-ts',
  Delimiter: '/'
}

exports.listAllFiles = function () {
  return new Promise((resolve, reject) => {
    s3.listObjectsV2(s3Params, (err, data) => {
      if (err) {
        reject(err)
      }
      const files = data.Contents.map((content) => {
        return content.Key
      })

      resolve(files)
    })
  })
}
