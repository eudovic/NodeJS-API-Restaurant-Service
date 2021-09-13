var express = require('express')
var router = express.Router()
var ProdutoController = require('../controllers/ProdutosController')
    // middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.post('/', ProdutoController.index)


module.exports = router