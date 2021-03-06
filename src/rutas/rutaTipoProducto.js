const { Router } = require('express');
const controladorTipoProducto = require('../controladores/controladorTipoProducto');
const router = Router();

const { body, query} = require('express-validator');

router.get('/', controladorTipoProducto.inicio);

router.get('/listar', controladorTipoProducto.listar);

router.post('/guardar', controladorTipoProducto.guardar);

router.put('/modificar', controladorTipoProducto.modificar);

router.delete('/eliminar', controladorTipoProducto.eliminar);

module.exports=router;