const ModeloCompra = require("../modelos/modeloCompra");

exports.inicio = (req, res) => {
    res.send("Esto es el inicio del módulo de compra");
};

exports.listarCompra = async (req, res) => { 
    const listaCompra = await ModeloCompra.findAll(); 
    if(listaCompra.length == 0){
        res.send("No existen datos");
    }
    else
    {
        res.json(listaCompra);
    }
};

exports.guardarCompra = async (req, res) => {
    const {fechaCompra, totalCompra} = req.body;
    if(!fechaCompra || !totalCompra )
    {
        res.send("Debe enviar los datos completos");
    }
    else
    {
        await ModeloCompra.create({
            fechaCompra: fechaCompra,
            totalCompra: totalCompra,
        })
        .then((data)=>{
            console.log(data);
            res.send("Registro almacenado");
        })
        .catch((error)=>{
            console.log(error);
            res.send("Error al guardar los datos");
        });
    }
};

exports.modificarCompra = async (req, res) => {
    const { id } = req.query;
    const { fechaCompra ,totalCompra } = req.body;

    if(!fechaCompra || !totalCompra )
    {
        res.send("Envie los datos completos");
    }
    else
    {
        var buscarCompra = await ModeloCompra.findOne({
            where:{
                id: id,
            }
        });
        if(!buscarCompra)
        {
            res.send("El id no existe");
        }
        else
        {
            buscarCompra.totalCompra = totalCompra;
            buscarCompra.fechaCompra = fechaCompra;
            await buscarCompra.save() //peticion a la base de datos para guaradar la infromacion 
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

exports.eliminarCompra = async (req, res) => {
    const { id } = req.query;

    if(!id)
    {
        res.send("Envie el id de registro");
    }
    else
    {
            await ModeloCompra.destroy({
                where:
                {
                    id: id,
                }
                
            })
            .then ((data)=>{
                console.log(data);
                if (data == 0)
                {
                    res.send("El id no existe");
                }
                else
                {
                    res.send("Registro eliminado");
                }
                
            })
            .catch((error)=>{
                console.log(error);
                res.send("Error al eliminar el registro");
            });
        }
};