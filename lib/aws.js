const AWS = require('aws-sdk')
const fs = require('fs')
const { getFileNameFromPath } = require('./files')

const s3 = new AWS.S3() // Pass in opts to S3 if necessary

const s3Params = {
  Bucket: 'lcloud-427-ts'
}

/**
 * A method for list all files present on the S3 Bucket at present
 */
const listAllFiles = function () {
  return new Promise((resolve, reject) => {
    s3.listObjects(s3Params, (err, data) => {
      if (err) {
        return reject(err)
      }

      resolve(data.Contents)
    })
  })
}

/**
 * A method for uploading a file to the S3 Bucket
 * @param {string} filePath - file path to be uploaded
 */
const uploadFile = function (filePath) {
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

/**
 * A method for searching into the S3 Bucket based on the given regex by
 * key name of the Object
 * @param {RegExp} regex - regular expression to be matched
 */
const findFiles = async function (regex) {
  const allFiles = await listAllFiles()

  const filteredFiles = allFiles.filter(({ Key }) => regex.test(Key))

  return filteredFiles
}

/**
 * A method for searching into the S3 Bucket based on the given regex by
 * key name of the Object and delete the found objects
 * @param {RegExp} regex - regular expression to be matched
 */
const findAndDeleteFiles = async function (regex) {
  const filteredFiles = await findFiles(regex)
  if (!filteredFiles.length) {
    return filteredFiles
  }

  const params = { ...s3Params }
  params.Delete = { Objects: [] }

  params.Delete.Objects = filteredFiles.map((data) => {
    return { Key: data.Key }
  })

  return new Promise((resolve, reject) => {
    s3.deleteObjects(params, function (err, data) {
      if (err) {
        return reject(err)
      } else if (data.Errors.length) {
        return reject(data.Errors)
      }

      resolve(data.Deleted)
    })
  })
}

module.exports = {
  listAllFiles,
  uploadFile,
  findFiles,
  findAndDeleteFiles
}
