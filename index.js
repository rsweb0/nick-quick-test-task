const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const inquirer = require('./lib/inquirer')
const { listAllFiles } = require('./lib/aws')

clear()

console.log(
  chalk.yellow(
    figlet.textSync('AWS-SDK-CLI', { horizontalLayout: 'default' })
  )
)

const run = async () => {
  const result = await inquirer.initialQuestion()
  switch (result.operation) {
    case 'List All Files':
      const allFiles = await listAllFiles()
      console.log(chalk.green(allFiles))
      break
    case 'Upload A File':
      break
    case 'Find Files':
      break
    case 'Find And Delete Files':
      break
  }
}

run()
