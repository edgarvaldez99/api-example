'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../services/db')

module.exports = function setupVentaModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('detalle', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    cantidad: {
      type: Sequelize.STRING,
      allowNull: false
    },
    precio: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    producto: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })
}
