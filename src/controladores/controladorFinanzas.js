const { query } = require("express");
const ModeloFinanzas = require('../modelos/modeloFinanzas');

exports.inicio = (req, res) =>{
    res.send("Esto es el inicio de el modelo de finanzas"); //Mensaje que mande adonde estamos
};


//Mostrar Datos en Finanzas
exports.listarFinanzas = async (req, res) => {
    const listaFinanzas = await ModeloFinanzas.findAll();
    if(listaFinanzas.length==0){
        res.send("No existen datos");
    }
    else{
        res.json(listaFinanzas); // Muestre si existen
    }
};
//Buscar Bitacora
exports.buscarFinanzas = async (req, res) => {
    const fil = req.query.filtro;
    const listaFinanzas = await ModeloBitacora.findAll({
        where: {
            id: fil
        }
    });
    if (lis.length == 0) {
        res.send("No existen datos");
    }
    else {
        res.json(listaFinanzas);
    }
};
//Guardar en Finanzas
exports.guardar = async (req, res) => {
    const {monto, finanzascol} = req.body; //Se capturan de lo que pusimos en postman
    if(!monto || !finanzascol){
        res.send("Debe enviar los datos completos");
    }
    else{
        await ModeloFinanzas.create({
            monto: monto, //NOMBRE DEL MODELO Y CAPTURA EL DATO
            finanzascol: finanzascol
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

//Modificar
exports.modificar = async (req, res) => {
    console.log(req.query);
    console.log(req.body);
    
    const { id } = req.query;
    const {monto} = req.body;

    if(!id || !monto)
    {
        res.send("Envie los datos completos");
    }
    else
    {
        var buscarFinanzas = await ModeloFinanzas.findOne({
            where:{
                id: id,
            }
        }); // await usar simepre en consultas a la base
        if(!buscarFinanzas)
        {
            res.send("El id no existe");
        }
        else
        {
            buscarFinanzas.monto = monto;
            await buscarFinanzas.save() //peticion a la base de datos para guaradar la infromacion 
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
        var buscarFinanzas = await ModeloFinanzas.findOne({
            where:{
                id: id,
            }
        }); // await usar simepre en consultas a la base
        if(!buscarFinanzas)
        {
            res.send("El id no existe");
        }
        else{
            await ModeloFinanzas.destroy({
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