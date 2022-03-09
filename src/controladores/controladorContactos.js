const { query } = require("express");
const ModeloContactos = require('../modelos/modeloContactos');
const{ validationResult } = require('express-validator');
const msj = require('../componentes/mensaje');


exports.inicio = (req, res) =>{
    res.send("Esto es el inicio de el modelo de Contactos"); //Mensaje que mande adonde estamos
};


//Mostrar Datos en Contactos
exports.listarContactos = async (req, res) => {
    const listaContactos = await ModeloContactos.findAll();
    if(listaContactos.length==0){
        res.send("No existen datos");
    }
    else{
        res.json(listaContactos); // Muestre si existen
    }
};
//Buscar Contactos
exports.buscarContactos = async (req, res) => {
    const fil = req.query.filtro;
    const listaContactos = await ModeloContactos.findAll({
        where: {
            tipoMensaje: fil
        }
    });
    if (listaContactos.length == 0) {
        res.send("No existen datos");
    }
    else {
        res.json(listaContactos);
    }
};
//Guardar en Contactos
exports.guardar = async (req, res) => {
    const validacion = validationResult(req);
    const {nombre, telefono, correo, mensaje, tipoMensaje, idUsuario} = req.body; //Se capturan de lo que pusimos en postman
    if(!nombre || !telefono|| !correo || !mensaje || !tipoMensaje ){ //!idUsuario
        //res.send("Debe enviar los datos completos");
        msj("Debe enviar los datos completos", 200, validacion.array(), res);

    }
    else{
        await ModeloContactos.create({
            nombre: nombre, //NOMBRE DEL MODELO Y CAPTURA EL DATO
            telefono: telefono,
            correo: correo,
            mensaje: mensaje,
            tipoMensaje: tipoMensaje,
           // idUsuario: idUsuario
        })
        //Validacion
        .then((data)=>{ //data es una variable
            console.log(data);
            //res.send("Registro Almacenado");
            msj("Registro Almacenado", 200, validacion.array(), res);
        })
        //Si hay problema
        .catch((error)=>{
            console.log(error);
            //res.send("Error al guardar los datos"); //Diciendole al usuario que hay un error
            msj("Error al guardar los datos", 200, validacion.array(), res);
        })
    }
};

//Modificar
exports.modificar = async (req, res) => {
    console.log(req.query);
    console.log(req.body);
    
    const { id } = req.query;
    const {nombre, telefono} = req.body;

    if(!id || !nombre || !telefono)
    {
        res.send("Envie los datos completos");
    }
    else
    {
        var buscarContactos = await ModeloContactos.findOne({
            where:{
                id: id,
            }
        }); // await usar simepre en consultas a la base
        if(!buscarContactos)
        {
            res.send("El id no existe");
        }
        else
        {
            buscarContactos.nombre = nombre;
            buscarContactos.telefono = telefono;
            await buscarContactos.save() //peticion a la base de datos para guaradar la infromacion 
            .then ((data)=>{
                console.log(data);
                res.send("Registro actualizado")
            })
            .catch((error)=>{
                console.log(error);
                res.send("Error al actualizar los datos");
            })
        }
    }
};

//Eliminar en Finanzas
exports.eliminar = async (req, res) => {
    const {id} = req.query;
    if(!id){
        res.send("Envie el id del registro");
    }
    else{
        var buscarContactos = await ModeloContactos.findOne({
            where:{
                id: id,
            }
        }); // await usar simepre en consultas a la base
        if(!buscarContactos)
        {
            res.send("El id no existe");
        }
        else{
            await ModeloContactos.destroy({
                where: {
                    id: id,
                }
            })
            .then ((data)=>{
                console.log(data);
                res.send("Registro eliminado")
            })
            .catch((error)=>{
                console.log(error);
                res.send("Error al eliminar el registro");
            })
        }
    }
};