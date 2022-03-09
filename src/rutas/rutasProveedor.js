const { Router } = require('express');
const controladorProvedor = require('../controladores/controladorProveedor');
const router = Router(); 
router.get('/', controladorProvedor.inicio); 
router.get('/listarProveedor', controladorProvedor.listarProveedor);
router.post('/guardarProveedor', controladorProvedor.guardarProveedor);
router.put('/modificarProveedor', controladorProvedor.modificarProveedor);
router.delete('/eliminarProveedor', controladorProvedor.eliminarProveedor);
module.exports = router;