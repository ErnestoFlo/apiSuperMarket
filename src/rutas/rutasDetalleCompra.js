const { Router } = require('express');
const controladorDetalleCompra = require('../controladores/controladorDetalleCompra');
const router = Router(); 
router.get('/', controladorDetalleCompra.inicio); 
router.get('/listarDetalleCompra', controladorDetalleCompra.listarDetalleCompra);
router.post('/guardarDetalleCompra', controladorDetalleCompra.guardarDetalleCompra);
router.put('/modificarDetalleCompra', controladorDetalleCompra.modificarDetalleCompra);
router.delete('/eliminarDetalleCompra', controladorDetalleCompra.eliminarDetalleCompra);
module.exports = router;