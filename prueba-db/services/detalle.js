'use strict'

module.exports = function setupDetalleService (DetalleModel, VentaModel) {
  async function createOrUpdate (ventaId, detalle) {
    const venta = await VentaModel.findOne({
      where: { id: ventaId }
    })

    if (venta) {
      Object.assign(detalle, { ventaId: venta.id })
      const result = await DetalleModel.create(detalle)
      return result.toJSON()
    }
  }

  async function findByVenta (ventaId) {
    return DetalleModel.findAll({
            // attributes: [ 'precio', 'producto', 'cantidad' ], Los campos que queremos retornar
      group: [ 'producto' ],
      include: [{
        attributes: [],
        model: VentaModel,
        where: {
          id: ventaId
        }
      }]
            // raw: true // En caso de usar attributes
    })
  }

  return {
    createOrUpdate,
    findById: DetalleModel.findById,
    findByVenta,
    findAll: DetalleModel.findAll
  }
}
