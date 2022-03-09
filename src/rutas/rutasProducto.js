const { Router } = require('express');
const controladorProducto = require('../controladores/controladorProducto');
const router = Router();

const { body, query} = require('express-validator');

router.get('/', controladorProducto.inicio);

router.get('/listar', controladorProducto.listar);

router.post('/guardar',
body('idTipo').isInt().withMessage('Debe enviar valores enteros para el id del tipo'),
body('idMarca').isInt().withMessage('Debe enviar valores enteros para el id de la marca'),
body('precioCompra').isDecimal().withMessage('El precio de compra debe ser un numero decimal.'),
body('precioVenta').isDecimal().withMessage('El precio de venta debe ser un numero decimal.'),
controladorProducto.guardar);

router.put('/modificar', 
body('idTipo').isInt().withMessage('Debe enviar valores enteros para el id del tipo'),
body('idMarca').isInt().withMessage('Debe enviar valores enteros para el id de la marca'),
body('precioCompra').isDecimal().withMessage('El precio de compra debe ser un numero decimal.'),
body('precioVenta').isDecimal().withMessage('El precio de venta debe ser un numero decimal.'),
controladorProducto.modificar);

router.delete('/eliminar', 
body('id').isInt().withMessage('Debe enviar valores enteros para el id del producto.'),
controladorProducto.eliminar);

module.exports=router;