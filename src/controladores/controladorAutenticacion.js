const ModeloUsuario = require('../modelos/modeloUsuario');
const EnviarCorreo = require('../configuraciones/correo');
const{ validationResult } = require('express-validator');
const passport = require('../configuraciones/passport');
const msj = require('../componentes/mensaje');

exports.InicioSesion = async (req, res) => {
    const { username, contrasena } = req.body;
    const validacion = validationResult(req);

    if(!validacion.isEmpty()){
        msj("Los campos estam vacions", 200, validacion.array(), res);
    }
    else{
        console.log(req.body);
        const BuscarUsuario = await ModeloUsuario.findOne({
            where:{
                username: username,
            }
        });
        if(!BuscarUsuario){
            msj("El username no existe o se encuentra inactivo", 200, [], res);
        }
        else{
            if(!BuscarUsuario.VerificarContrasena(contrasena, BuscarUsuario.contrasena)){
                console.log(BuscarUsuario.contrasena)
                msj("El username o contraseña incorrecta", 200, [], res);
            }
            else{
                const Token = passport.getToken({id: BuscarUsuario.id});
                const data = {
                    token: Token,
                    username: BuscarUsuario,
                };

                msj("Bienvenido!!!", 200, data, res);
            }
        }
    }
};

exports.ValidarAutenticado = passport.validarAutenticado;

exports.ErrorAutenticacion = (req, res) =>{
    msj("Error en la autenticacion de usuario", 200, [], res);
}

exports.RecuperarCorreo = async (req, res) => {
    
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        console.log(validacion.array());
        res.json(validacion.array());
    }
    else{
        const{ correo } = req.body;
        const buscarUsuario = await ModeloUsuario.findOne({
            where:{
                correo: correo
            }
        });
        const pin = '1234';
        const data ={
            correo: correo,
            pin: pin,
        };

        EnviarCorreo.recuperarContrasena(data);
        //res.send('Correo enviado');
        msj("Correo enviado", 200, validacion.array(), res);

    }  
    
}