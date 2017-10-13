'use strict'

const db = require('../')

const defaul = 'evaldez'

const config = {
  dialect: 'posgresql', // el motor de base de datos
  databese: process.env.DB_NAME || defaul, // el nombre de la base de datos
  username: process.env.BD_USER || defaul, // el usuario admin de la base de datos
  password: process.env.DB_PASS || '1234', // el password del usario de la base de datos
  host: process.env.HOST || 'localhost' // el host desde donde nos conectamos con la base de datos
}

async function executarQuerys () {
    // const Venta = db(config).Venta;
    // const Detalle = db(config).Detalle;
    // shorcut
  const { Venta, Detalle } = db(config).catch(handleFatalError)

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

  function handleFatalError (err) {
    console.error(err.message)
    console.error(err.stack)
    process.exit(1)
  }
}

executarQuerys()
