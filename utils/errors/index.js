'use strict'

const chalk = require('chalk')

function printError (err, msg) {
  console.error(msg)
  console.error(err.stack)
}

function handleFatalError (err) {
  printError(err, `${chalk.red('[fatal error]')} ${err.message}`)
  process.exit(1)
}

function handleError (err) {
  printError(err, `${chalk.red('[error]')} ${err.message}`)
}

module.export = {
  handleFatalError,
  handleError
}
