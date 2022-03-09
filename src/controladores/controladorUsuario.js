const ModeloUsuario = require('../modelos/modeloUsuario');
const{ validationResult } = require('express-validator');
const msj = require('../componentes/mensaje');

exports.inicio = (req, res) =>{
    res.send("Esto es el inicio del modulo de Usuario.");
};
exports.listar = async (req, res) =>{
    const listaUsuario = await ModeloUsuario.findAll();
    if(listaUsuario.length == 0){
        res.send("No existen datos");
    }
    else{
        res.json(listaUsuario);
    }
};
exports.guardar = async (req, res) =>{
    const {username, correo, contrasena, idtipo, puntos, idRegistro, telefono, estado, idPersona } = req.body;
    const validacion = validationResult(req);

    if (!username || !correo || !contrasena || !idtipo || !idRegistro || !estado || !idPersona){
        //res.send("Debe enviar los datos completos.");
        msj("Debe enviar los datos completos", 200, validacion.array(), res);
    }
    else {
        await ModeloUsuario.create({
            username: username,
            correo: correo,
            contrasena: contrasena,
            idtipo: idtipo,
            puntos: puntos,
            idRegistro: idRegistro,
            telefono: telefono,
            estado: estado,
            idPersona:idPersona,
        })
        .then((data)=>{
            console.log(data);
            //res.send("Registro Almacenado");
            msj("Registro Almacenado", 200, validacion.array(), res);

        })
        .catch((error)=>{
            console.log(error);
            //res.send("Error al guardar los datos.");
            msj("Error al guardar los datos.", 200, validacion.array(), res);

        });
    }
};
exports.modificar = async (req, res) =>{
    const {id} = req.query;
    const {username, correo, contrasena, idtipo, puntos, idRegistro, telefono, estado, idPersona } = req.body;
    if (!id || !username || !correo || !contrasena || !idtipo || !idRegistro || !estado || !idPersona){
        res.send("Debe enviar los datos completos.");
    }
    else{
        var buscarusuario = await ModeloUsuario.findOne({
            where:{
                id:id,
            }
        });
        if(!buscarusuario){
            res.send("El id no existe.");
        }
        else{
            buscarusuario.username=username;
            buscarusuario.correo=correo;
            buscarusuario.contrasena=contrasena;
            buscarusuario.idtipo=idtipo;
            buscarusuario.puntos=puntos;
            buscarusuario.idRegistro=idRegistro;
            buscarusuario.telefono=telefono;
            buscarusuario.estado=estado;
            buscarusuario.idPersona=idPersona;
            await buscarusuario.save()
            .then((data)=>{
                console.log(data);
                res.send("Registro actualizado");
            })
            .catch((error)=>{
                console.log(error);
                res.send("Error al actualizar los datos.");
            })
        }
    }
};
exports.eliminar = async (req, res) =>{
    const {id} = req.query;
    if (!id){
        res.send("Envie el id del registro.");
    }
    else{
        await ModeloUsuario.destroy({
            where:{
                id: id,
            }
        })
        .then((data)=>{
            console.log(data);
            if (data==0){
                res.send("El id no existe");
            }
            else{
                res.send("Registro eliminado.");
            }
        })
        .catch((error)=>{
            console.log(error);
            res.send("Error al eliminar los datos.");
        }) 
    }
};