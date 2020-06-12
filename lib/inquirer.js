const inquirer = require('inquirer')

module.exports = {

  initialQuestion: () => {
    const questions = [
      {
        name: 'operation',
        type: 'rawlist',
        message: 'What do you want to do:',
        choices: ['List All Files', 'Upload A File', 'Find Files', 'Find And Delete Files'],
        validate: function (value) {
          if (value.length) {
            return true
          } else {
            return 'Please enter your username or e-mail address.'
          }
        }
      }
    ]
    const answer = inquirer.prompt(questions)
    return answer
  }
}
