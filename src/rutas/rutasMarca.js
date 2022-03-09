const { Router } = require('express');
const controladorMarca = require('../controladores/controladorMarca');
const router = Router();

const { body, query} = require('express-validator');

router.get('/', controladorMarca.inicio);

router.get('/listar', controladorMarca.listar);

router.post('/guardar', controladorMarca.guardar);

router.put('/modificar', controladorMarca.modificar);

router.delete('/eliminar', controladorMarca.eliminar);

module.exports=router;