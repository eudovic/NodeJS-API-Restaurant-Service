var express = require('express')
var router = express.Router()
var ProdutoController = require('../controllers/ProdutosController')
var ComandasController = require('../controllers/ComandasController')
var GastosController = require('../controllers/GastosController')
var ColaboradoresController = require('../controllers/ColaboradoresController')
var LoginController = require('../controllers/LoginController')
const FilaDeImpressaoController = require('../controllers/FilaDeImpressaoController')
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

router.get('/filas', FilaDeImpressaoController.index)

router.post('/expenses', GastosController.sendProduct)

router.post('/login', LoginController.logar)

router.delete('/expenses/:idGasto', GastosController.deletarGasto)

module.exports = router