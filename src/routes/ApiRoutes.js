var express = require('express')
var router = express.Router()
var ProdutoController = require('../controllers/ProdutosController')
var ComandasController = require('../controllers/ComandasController')
var GastosController = require('../controllers/GastosController')
var ColaboradoresController = require('../controllers/ColaboradoresController')
    // middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('/products', ProdutoController.index)

router.get('/orderpads', ComandasController.index)

router.get('/contributors', ColaboradoresController.index)

router.get('/expenses', GastosController.sendProduct)

router.post('/expenses', GastosController.sendProduct)

module.exports = router