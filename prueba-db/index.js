'use strict'

const setupDatabase = require('./services/db')
const setupVentaModel = require('./models/venta')
const setupDetalleModel = require('./models/detalle')
const setupVenta = require('./services/venta')
const setupDetalle = require('./services/detalle')
const defaults = require('defaults')

module.exports = async function (config) {
  config = defaults(config, {
    dialect: 'sqlite',
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    },
    query: {
      raw: true
    }
  })

  const sequelize = setupDatabase(config)
  const VentaModel = setupVentaModel(config)
  const DetalleModel = setupDetalleModel(config)

  VentaModel.hasMany(DetalleModel)
  DetalleModel.belongsTo(VentaModel)

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const Venta = setupVenta(VentaModel)
  const Detalle = setupDetalle(DetalleModel, VentaModel)

  return {
    Venta,
    Detalle
  }
}
