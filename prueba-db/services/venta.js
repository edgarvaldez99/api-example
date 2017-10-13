'use strict'

module.exports = function setupVentaService (VentaModel) {
  async function createOrUpdate (venta) {
    const filtroQuery = {
      where: {
        codigo: venta.codigo
      }
    }

    const existeVenta = await VentaModel.findOne(filtroQuery)

    if (existeVenta) {
      const updated = await VentaModel.update(venta, filtroQuery)
      return updated ? VentaModel.findOne(filtroQuery) : existeVenta
    }

    const result = await VentaModel.create(venta)
    return result.toJSON()
  }

  async function findByCliente (cliente) {
    return VentaModel.findAll({
      where: {
        cliente
      }
    })
  }

  return {
    createOrUpdate,
    findById: VentaModel.findById,
    findByCliente,
    findAll: VentaModel.findAll
  }
}
