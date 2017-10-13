'use strict'

// Doc: http://docs.sequelizejs.com/manual/
const Sequelize = require('sequelize')

let db

module.exports = function setupDatabase (config) {
  if (!db) {
    db = new Sequelize(config)
  }
  return db
}
