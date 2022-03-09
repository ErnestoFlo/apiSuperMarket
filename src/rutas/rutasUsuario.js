const { Router } = require('express');
const controladorUsuario = require('../controladores/controladorUsuario');
const router = Router();
router.get('/', controladorUsuario.inicio);
router.get('/listar',controladorUsuario.listar);
router.post('/guardar',controladorUsuario.guardar);
router.put('/modificar',controladorUsuario.modificar);
router.delete('/eliminar',controladorUsuario.eliminar);
module.exports = router;
