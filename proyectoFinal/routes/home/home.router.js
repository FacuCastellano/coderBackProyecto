const { Router } = require('express')
const RoutePolices = require('../../middelwares/routes.polices')
const HomeController = require('../../controllers/home.controllers')
const isAuth = require('../../middelwares/userAuth')
const isAuthToken = require('../../middelwares/userAuthToken')
const setLastConnection = require('../../middelwares/last.connection.js')
const router = Router()

//estas rutas no tienen prefijo (api) son las visualizaciones del home.
router.get('/', isAuth, setLastConnection, HomeController.showHome) //pongo el lastConnection aca para independizarme de la estrategia de validacion que use..

router.get('/carts/', HomeController.redirectToHome)

//ruta para listar los productos de un cart
router.get('/carts/:cid', isAuth, HomeController.showCartProducts)

router.get('/chat', isAuth, HomeController.showChat)

router.get('/realtimeproducts', HomeController.showRealTimeProducts)

router.get('/singup', HomeController.showSingup)

router.get('/login', HomeController.showLogin)

router.get('/profile', isAuth, HomeController.showProfile)

//esta ruta es la que se entra con el token de acceso que se manda por mail
router.get(
  '/refresh-pass-private',
  isAuthToken,
  HomeController.refreshPassPrivate
)

//esta ruta es la que se entra para disparar el mail, es publica
router.get('/refresh-pass-public', HomeController.refreshPassPublic)

//esta ruta es la que se entra para la vista para cargar imagenes
router.get('/uploader', isAuth, HomeController.uploadProductImage)

//esta ruta es para visualizar,cambiar el rol de usuarios y eliminar usuarios
router.get(
  '/user-viewer',
  isAuth,
  RoutePolices.onlyAdmin,
  HomeController.userViewer
)

module.exports = router
