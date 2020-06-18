const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const inquirer = require('./lib/inquirer')
const { listAllFiles, uploadFile, findFiles, findAndDeleteFiles } = require('./lib/aws')

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

      if (!allFiles.length) {
        return console.log(chalk.red('No Files Found'))
      }

      console.log(chalk.green('Below is the list of all files'))
      console.table(allFiles, ['Key', 'ETag', 'LastModified'])
      break

    case 'Upload A File':
      const { filePath } = await inquirer.uploadFile()

      const fileUrl = await uploadFile(filePath)

      console.log(chalk.green(`File Uploaded Successfully URL: ${fileUrl}`))
      break

    case 'Find Files':
      const findFilesAnswer = await inquirer.findFiles()

      const filteredFiles = await findFiles(new RegExp(findFilesAnswer.regex))

      if (!filteredFiles.length) {
        return console.log(chalk.red('No Files Found'))
      }

      console.log(chalk.green('Below is the list all matched files'))
      console.table(filteredFiles, ['Key', 'ETag', 'LastModified'])

      break
    case 'Find And Delete Files':
      const findAndDeleteFilesAnswer = await inquirer.findFiles()

      const deletedFiles = await findAndDeleteFiles(new RegExp(findAndDeleteFilesAnswer.regex))

      if (!deletedFiles.length) {
        return console.log(chalk.red('No Files Deleted'))
      }

      console.log(chalk.green('Below is the list of deleted files'))
      console.table(deletedFiles, ['Key'])

      break
  }
}

run()
