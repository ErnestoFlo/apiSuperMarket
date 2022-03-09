const { Router } = require('express');
const controladorBitacora = require('../controladores/controladorBitacoraFinanzas');
const { body, query } = require('express-validator');
const router = Router();

router.get('/', controladorBitacora.inicio);
router.get('/listar', controladorBitacora.listarBitacora);
router.get('/buscarbitacora', controladorBitacora.buscarBitacora);

//Validacion de datos
router.post('/guardar',
     body('id').isInt().withMessage('Debe enviar valores enteros'),
     body('tipoTransaccion').isInt({ min: 1 }).withMessage('Ingrese solo un (1) valor'),
     body('fechaTransaccion').isDate().withMessage('Por favor ingrese una fecha.'), 
controladorBitacora.guardar);

router.put('/modificarbitacora', controladorBitacora.modificar);
router.delete('/eliminar', controladorBitacora.eliminar);

module.exports= router;