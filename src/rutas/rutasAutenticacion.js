const { Router } = require('express');

const controladorAutenticacion = require('../controladores/controladorAutenticacion');
const { body, query } = require('express-validator');
const router = Router();

router.post('/recuperarcontrasena', 
body('correo').isEmail().withMessage('Debe escribir una dirección de correo valida'), 
controladorAutenticacion.RecuperarCorreo);

router.post('/iniciosesion', 
body('username').isLength({min:3}).withMessage('Debe escribir un usuario correcto'), 
body('contrasena').isLength({min:6}).withMessage('La longitud mínima de la contraseña es de 6 caracteres'),
controladorAutenticacion.InicioSesion);

router.get('/error', controladorAutenticacion.ErrorAutenticacion);
module.exports = router;