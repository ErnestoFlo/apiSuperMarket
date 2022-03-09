const ModeloDevolucion = require('../modelos/modeloDevolucion');
exports.inicio = (req, res) => {
    res.send("Esto es el inicio de el modulo de devoluciones");
};

exports.listar = async (req, res) => {
    const listaDevolucion = await ModeloDevolucion.findAll();
    if(listaDevolucion.length==0){
        res.send("No existen datos");
    }
    else{
        res.json(listaDevolucion);
    }
};

exports.guardar = async (req, res) => {
    const {idProducto, cantidad, fechaDevolucion} = req.body;
    if(!idProducto || !cantidad || !fechaDevolucion){
        res.send("Debe enviar los datos completos");
    }
    else{
        await ModeloDevolucion.create({
            idProducto: idProducto,
            cantidad: cantidad,
            fechaDevolucion: fechaDevolucion
        })

        .then((data)=>{
            console.log(data);
            res.send("registro Almacenado")
        })
        .catch((error)=>{
            console.log(error);
            res.send("Error al guardar los datos");
        })
        ;

    }
};

exports.modificar = async (req, res) => {

    const {id} = req.query;
    const {idProducto, cantidad, fechaDevolucion} = req.body;
    if(!idProducto || !cantidad || !fechaDevolucion){
        res.send("Envie los datos completos");
    }
    else{
        var buscardevolucion = await ModeloDevolucion.findOne({
            where:{
                id:id,
            }
        });
        if(!buscardevolucion){
            res.send("El id no existe");
        }
        else{
            buscardevolucion.idProducto=idProducto;
            buscardevolucion.cantidad=cantidad;
            buscardevolucion.fechaDevolucion=fechaDevolucion;

            await buscardevolucion.save()
            .then((data)=>{
                console.log(data);
                res.send("Registro actualizado");
            })
            .catch((error)=>{
                console.log(error);
                res.send("Error al actualizar los datos")
            });
        }
    }
    
};


exports.eliminar = async (req, res) => {

    const {id} = req.query;

    if(!id){
        res.send("Envie el id del registro");
    }
    else{
        var buscardevolucion = await ModeloDevolucion.findOne({
            where:{
                id:id,
            }
        });
        if(!buscardevolucion){
            res.send("El id no existe");
        }
        else{
            await ModeloDevolucion.destroy({
                where:
                {
                    id:id,
                }
            })

            .then((data)=>{
                console.log(data);
                res.send("Registro eliminado");
            })
            .catch((error)=>{
                console.log(error);
                res.send("Error al eliminar el registro")
            });
        }
    }
    
};