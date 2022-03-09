const { Router } = require('express');
const controladorCompra = require('../controladores/controladorCompra');
const router = Router(); 
router.get('/', controladorCompra.inicio); 
router.get('/listarCompra', controladorCompra.listarCompra);
router.post('/guardarCompra', controladorCompra.guardarCompra);
router.put('/modificarCompra', controladorCompra.modificarCompra);
router.delete('/eliminarCompra', controladorCompra.eliminarCompra);
module.exports = router;