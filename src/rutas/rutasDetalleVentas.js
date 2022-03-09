const{ Router } = require('express');
const controladorDetalleVentas= require('../controladores/controladorDetalleVentas');
const router = Router();

router.get('/',controladorDetalleVentas.inicio)
router.get('/listar',controladorDetalleVentas.listar)
router.post('/guardar',controladorDetalleVentas.guardar)
router.put('/modificar',controladorDetalleVentas.modificar)
router.delete('/eliminar',controladorDetalleVentas.eliminar)

module.exports=router;