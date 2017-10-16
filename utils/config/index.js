'use strict'

const debug = require('debug')('platziverse:config')
const defaultDb = 'evaldez', pass = '1234';

module.exports = {
  db: {
    database: process.env.DB_NAME || defaultDb,
    username: process.env.DB_USER || defaultDb,
    password: process.env.DB_PASS || pass,
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s),
    setup: true
  },
  auth: {
    secret: process.env.SECRET || pass
  }
}
