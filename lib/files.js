const fs = require('fs')
const path = require('path')

module.exports = {

  /**
 * A method for extracting the filename from the filePath
 * @param {string} filePath - filePath from which need to extract the name
 */
  getFileNameFromPath (filePath) {
    return path.parse(filePath).base
  },

  /**
 * A method for check the file is present or not based on filePath
 * @param {string} filePath - filePath to check
 */
  fileExists (filePath) {
    try {
      return fs.existsSync(filePath)
    } catch (err) {
      return false
    }
  },

  /**
 * A method to convert the relative path to the absolute path
 * @param {string} filePath - filePath to convert
 */
  absolutePath (filePath) {
    return path.resolve(process.cwd(), filePath)
  }
}
