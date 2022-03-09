const { query } = require("express");
const ModeloBitacora = require('../modelos/modeloBitacoraFinanzas');

exports.inicio = (req, res) =>{
    res.send("Esto es el inicio de el modelo de Bitacora Finanzas"); //Mensaje que mande adonde estamos
};


//Mostrar Datos en Bitacora
exports.listarBitacora = async (req, res) => {
    
    const listaBitacora = await ModeloBitacora.findAll();
    if(listaBitacora.length==0){
        res.send("No existen datos");
    }
    else{
        res.json(listaBitacora); // Muestre si existen
    }
};

//Buscar Bitacora
exports.buscarBitacora = async (req, res) => {
    const fil = req.query.filtro;
    const listaBitacora = await ModeloBitacora.findAll({
        where: {
            fechaTransaccion: fil
        }
    });
    if (listaBitacora.length == 0) {
        res.send("No existen datos");
    }
    else {
        res.json(listaBitacora);
    }
};

//Guardar en Bitacora
exports.guardar = async (req, res) => {
    const {fechaTransaccion, tipoTransaccion} = req.body; //Se capturan de lo que pusimos en postman
    if(!fechaTransaccion || !tipoTransaccion){
        res.send("Debe enviar los datos completos");
    }
    else{
        await ModeloBitacora.create({
            fechaTransaccion: fechaTransaccion, //NOMBRE DEL MODELO Y CAPTURA EL DATO
            tipoTransaccion: tipoTransaccion
        })
        //Validacion
        .then((data)=>{ //data es una variable
            console.log(data);
            res.send("Registro Almacenado")
        })
        //Si hay problema
        .catch((error)=>{
            console.log(error);
            res.send("Error al guardar los datos"); //Diciendole al usuario que hay un error
        })
    }
};

//Modificar Bitacora
exports.modificar = async (req, res) => {
    console.log(req.query);
    console.log(req.body);
    
    const { id } = req.query;
    const {fechaTransaccion} = req.body;
    const {tipoTransaccion} = req.body;

    if(!id || !fechaTransaccion|| !tipoTransaccion)
    {
        res.send("Envie los datos completos");
    }
    else
    {
        var buscarBitacora = await ModeloBitacora.findOne({
            where:{
                id: id,
            }
        }); // await usar simepre en consultas a la base
        if(!buscarBitacora)
        {
            res.send("El id no existe");
        }
        else
        {
            buscarBitacora.fechaTransaccion = fechaTransaccion;
            buscarBitacora.tipoTransaccion = tipoTransaccion;
            await buscarBitacora.save() //peticion a la base de datos para guaradar la infromacion 
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

//Eliminar en Bitacora
exports.eliminar = async (req, res) => {
    const {id} = req.query;
    if(!id){
        res.send("Envie el id del registro");
    }
    else{
        var buscarBitacora = await ModeloBitacora.findOne({
            where:{
                id: id,
            }
        }); // await usar simepre en consultas a la base
        if(!buscarBitacora)
        {
            res.send("El id no existe");
        }
        else{
            await ModeloBitacora.destroy({
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