const { Router } = require('express');
const controladorDevolucion = require('../controladores/controladorDevolucion');
const router = Router();

const { body, query} = require('express-validator');

router.get('/', controladorDevolucion.inicio);

router.get('/listar', controladorDevolucion.listar);

router.post('/guardar',
body('idProducto').isInt().withMessage('Debe enviar valores enteros para el id del producto.'),
body('cantidad').isDecimal().withMessage('Debe enviar valores decimales para la cantidad del producto.'),
body('fechaDevolucion').isDecimal().withMessage('Debe enviar valores decimales para la cantidad del producto.'),
controladorDevolucion.guardar);

router.put('/modificar', 
body('idProducto').isInt().withMessage('Debe enviar valores enteros para el id del producto.'),
body('cantidad').isDecimal().withMessage('Debe enviar valores decimales  para la cantidad del producto.'),
body('fechaDevolucion').isDecimal().withMessage('Debe enviar valores decimales para la cantidad del producto.'),
controladorDevolucion.modificar);

router.delete('/eliminar', 
body('id').isInt().withMessage('Debe enviar valores enteros para el id de la devolucion.'),
controladorDevolucion.eliminar);

module.exports=router;