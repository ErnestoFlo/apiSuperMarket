const { Router } = require('express');
const controladorFinanzas = require('../controladores/controladorFinanzas');
const { body, query } = require('express-validator');
const router = Router();

router.get('/', controladorFinanzas.inicio);
router.get('/listar', controladorFinanzas.listarFinanzas);
router.get('/buscarfinanzas', controladorFinanzas.buscarFinanzas);

//Validacion de datos
router.post('/guardar',
     body('id').isInt().withMessage('Debe enviar valores enteros'),
     //body('monto').isInt({ min: 3 }).withMessage('El valor debe ser entero'), 
     body('finanzascol').isLength({ min: 3 }).withMessage('Descripcion debe ser mayor a 3 caracteres'), 
     controladorFinanzas.guardar);

router.put('/modificarfinanzas', controladorFinanzas.modificar);
router.delete('/eliminar', controladorFinanzas.eliminar);

module.exports= router;