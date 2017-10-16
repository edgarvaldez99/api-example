'use strict'

const db = require('../')

const defaul = 'evaldez'

const config = require('utils-config').db
const { handleFatalError } = require('utils-errors')

async function executeQueries () {
    // const Venta = db(config).Venta;
    // const Detalle = db(config).Detalle;
    // shorcut
  const { Venta, Detalle } = await db(config).catch(handleFatalError)

  const venta = await Venta.createOrUpdate({
        // id: autoincremental,
        // fecha: fecha actual automatica,
    codigo: '001', // Si ya existe este valor se actualiza
    monto: 2000,
    cliente: 'Fulano'
  }).catch(handleFatalError)

  console.log(venta)

  const detalle = await Detalle.createOrUpdate(venta.id, {
        // id: autoincremental,
    cantidad: 2,
    precio: 1000,
    producto: 'HIELO'
  }).catch(handleFatalError)

  console.log(detalle)

  let ventas = await Venta.findAll().catch(handleFatalError)

  console.log(ventas)

  let ventasCliente = await Venta.findByCliente('Fulano').catch(handleFatalError)

  console.log(ventasCliente)

  let detallesVenta = await Detalle.findByVenta(venta.id).catch(handleFatalError)

  console.log(detallesVenta)
}

executeQueries()
