const { Router } = require('express');
const controladorContactos = require('../controladores/controladorContactos');
//Validacione Variables
const { body, query } = require('express-validator');


const router = Router();
router.get('/', controladorContactos.inicio);
router.get('/listar', controladorContactos.listarContactos);
router.get('/buscarContactos', controladorContactos.buscarContactos);
//Validacion de datos
router.post('/guardar',
     body('id').isInt().withMessage('Debe enviar valores enteros'),
    body('fechaTransaccion').isDate().withMessage('Por favor ingrese una fecha'), 
    body('correo').isEmail().withMessage('Debe enviar un correo valido'), 
    body('telefono').isLength({min:10}).withMessage('El telefono debe ser mayor a 10 caracteres'),
    body('nombre').isString().withMessage('Por favor ingrese letras'),
    controladorContactos.guardar);

router.put('/modificarcontactos', controladorContactos.modificar);
router.delete('/eliminar', controladorContactos.eliminar);
module.exports = router;