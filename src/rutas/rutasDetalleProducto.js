const { Router } = require('express');
const controladorDetalleProducto = require('../controladores/controladorDetalleProducto');
const router = Router();

const { body, query} = require('express-validator');

router.get('/', controladorDetalleProducto.inicio);

router.get('/listar', controladorDetalleProducto.listar);

router.post('/guardar',
body('codigoBarra').isInt().withMessage('Debe enviar valores enteros para el codigo de barra.'),
body('fechaVencimiento').isDate().withMessage('Debe enviar una fecha válida para la fecha de vencimiento.'),
body('fechaElaboracion').isDate().withMessage('Debe enviar una fecha válida para la fecha de elaboración.'),
body('idProducto').isInt().withMessage('Debe enviar valores enteros para el id del Producto'),
controladorDetalleProducto.guardar);

router.put('/modificar', 
body('codigoBarra').isInt().withMessage('Debe enviar valores enteros para el codigo de barra.'),
body('fechaVencimiento').isDate().withMessage('Debe enviar una fecha válida para la fecha de vencimiento.'),
body('fechaElaboracion').isDate().withMessage('Debe enviar una fecha válida para la fecha de elaboración.'),
body('idProducto').isInt().withMessage('Debe enviar valores enteros para el id del Producto'),
controladorDetalleProducto.modificar);

router.delete('/eliminar', 
body('id').isInt().withMessage('Debe enviar valores enteros para el id del detalle de producto.'),
controladorDetalleProducto.eliminar);

module.exports=router;