const{ Router } = require('express');
const controladorVentas= require('../controladores/controladorVentas');
const router = Router();

router.get('/',controladorVentas.inicio)
router.get('/listar',controladorVentas.listar)
router.post('/guardar',controladorVentas.guardar)
router.put('/modificar',controladorVentas.modificar)
router.delete('/eliminar',controladorVentas.eliminar)

module.exports=router;