#! usr/bin/env node

'use strict'

const debug = require('debug')('api-example:db:setup')
const inquirer = require('inquirer')
const chalk = require('chalk')
const minimist = require('minimist')
const db = require('./')

const args = minimist(process.argv)
const prompt = inquirer.createPromptModule()

const configurations = require('utils-config')
const { handleFatalError } = require('utils-errors')

async function setup () {
  if (!args.yes) {
    const answer = await prompt([
      {
        type: 'confirm',
        name: 'setup',
        message: 'This will destroy your database, are you sure?'
      }
    ])

    if (!answer.setup) {
      return console.log('Nothing happened :)')
    }
  }

  const config = configurations.db

  await db(config).catch(handleFatalError)

  console.log('Success!')
  process.exit(0)
}

setup()
