'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../services/db')

module.exports = function setupVentaModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('venta', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fecha: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    codigo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    monto: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    cliente: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })
}
