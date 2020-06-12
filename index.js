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
      console.table(allFiles, ['Key', 'ETag', 'LastModified'])
      break
    case 'Upload A File':
      const { filePath } = await inquirer.uploadFile()
      const fileUrl = await uploadFile(filePath)
      console.log(chalk.green(`File Uploaded Successfully URL: ${fileUrl}`))
      break
    case 'Find Files':
      const result = await inquirer.findFiles()
      const regex = new RegExp(result.regex)
      const filteredFiles = await findFiles(regex)
      if (!filteredFiles.length) {
        return console.log(chalk.red('No Files Found'))
      }
      console.table(filteredFiles, ['Key', 'ETag', 'LastModified'])
      break
    case 'Find And Delete Files':
      const answer = await inquirer.findFiles()
      const regexDeleteFiles = new RegExp(answer.regex)
      const deletedFiles = await findAndDeleteFiles(regexDeleteFiles)
      if (!deletedFiles.length) {
        return console.log(chalk.red('No Files Found'))
      }
      console.table(deletedFiles, ['Key', 'ETag', 'LastModified'])
      break
  }
}

run()
