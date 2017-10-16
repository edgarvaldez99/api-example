'use strict'

// Doc: http://docs.sequelizejs.com/manual/
const Sequelize = require('sequelize')

let db

module.exports = function setupDatabase (config) {
  if (!db) {
    Object.assign(config, { operatorsAliases: false })
    db = new Sequelize(config.database, config.username, config.password, config)
  }
  return db
}
