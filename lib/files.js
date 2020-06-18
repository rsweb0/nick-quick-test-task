const fs = require('fs')
const path = require('path')

module.exports = {
  getFileNameFromPath (filePath) {
    return path.parse(filePath).base
  },

  fileExists (filePath) {
    try {
      return fs.existsSync(this.absolutePath(filePath))
    } catch (err) {
      return false
    }
  },

  absolutePath (filePath) {
    return path.resolve(process.cwd(), filePath)
  }
}
