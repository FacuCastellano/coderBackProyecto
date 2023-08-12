const { Router } = require('express')
const ProductsRouter = require('./api/products.router')
const CartsRouter = require('./api/carts.router')
const HomeRouter = require('./api/home.router')


// /api
const routerApi = Router()
const routerHome = Router()
// rutas de products
routerApi.use('/products', ProductsRouter )
// // rutas de carts
routerApi.use('/carts', CartsRouter)

// // rutas de home - motor de plantillas
routerHome.use('/', HomeRouter)


module.exports = {
  api:routerApi,
  home:routerHome
}