var express = require('express')
var router = express.Router()
var ProdutoController = require('../controllers/ProdutosController')
var ComandasController = require('../controllers/ComandasController')
var GastosController = require('../controllers/GastosController')
var ColaboradoresController = require('../controllers/ColaboradoresController')
var LoginController = require('../controllers/LoginController')
    // middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('/products', ProdutoController.index)

router.get('/products/complements', ProdutoController.complementos)

router.get('/orderpads', ComandasController.index)

router.get('/contributors', ColaboradoresController.index)

router.get('/expenses', GastosController.index)

router.post('/expenses', GastosController.sendProduct)

router.delete('/expenses/:idGasto', GastosController.deletarGasto)

router.post('/login', LoginController.logar)

module.exports = router