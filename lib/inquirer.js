const inquirer = require('inquirer')
const files = require('./files')

module.exports = {

  initialQuestion: () => {
    const questions = [
      {
        name: 'operation',
        type: 'rawlist',
        message: 'What do you want to do:',
        choices: ['List All Files', 'Upload A File', 'Find Files', 'Find And Delete Files']
      }
    ]
    const answer = inquirer.prompt(questions)
    return answer
  },

  uploadFile: () => {
    const questions = [
      {
        name: 'filePath',
        type: 'input',
        message: 'Enter the Path of file:',
        validate: function (value) {
          if (value.length) {
            if (!files.fileExists(value)) {
              return 'File Not Exist'
            }
            return true
          } else {
            return 'Please Enter Valid File path'
          }
        },
        filter: (answer) => {
          return files.absolutePath(answer)
        }
      }
    ]
    const answer = inquirer.prompt(questions)
    return answer
  },

  findFiles: () => {
    const questions = [
      {
        name: 'regex',
        type: 'input',
        message: 'Enter the regex:',
        validate: function (value) {
          return !!value.length || 'Please Enter Valid Regex'
        }
      }
    ]
    const answer = inquirer.prompt(questions)
    return answer
  }
}
