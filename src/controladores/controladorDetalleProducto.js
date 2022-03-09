const ModeloDetalleProducto = require('../modelos/modeloDetalleProducto');
exports.inicio = (req, res) => {
    res.send("Esto es el inicio de el modulo de detalle de productos.");
};

exports.listar = async (req, res) => {
    const listaDetalleProductos = await ModeloDetalleProducto.findAll();
    if(listaDetalleProductos.length==0){
        res.send("No existen datos");
    }
    else{
        res.json(listaDetalleProductos);
    }
};

exports.guardar = async (req, res) => {
    const {codigoBarra, fechaVencimiento, fechaElaboracion, idProducto} = req.body;
    if(!codigoBarra || !fechaElaboracion || !idProducto){
        res.send("Debe enviar los datos completos");
    }
    else{
        await ModeloDetalleProducto.create({
            codigoBarra: codigoBarra,
            fechaVencimiento: fechaVencimiento,
            fechaElaboracion: fechaElaboracion,
            idProducto: idProducto,
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
    const {codigoBarra, fechaVencimiento, fechaElaboracion, idProducto} = req.body;
    if(!codigoBarra || !fechaElaboracion || !idProducto){
        res.send("Envie los datos completos");
    }
    else{
        var buscardetalleproducto = await ModeloDetalleProducto.findOne({
            where:{
                id:id,
            }
        });
        if(!buscardetalleproducto){
            res.send("El id no existe");
        }
        else{
            buscardetalleproducto.codigoBarra=codigoBarra;
            buscardetalleproducto.fechaVencimiento=fechaVencimiento;
            buscardetalleproducto.fechaElaboracion=fechaElaboracion;
            buscardetalleproducto.idProducto=idProducto;
            

            await buscardetalleproducto.save()
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
        var buscardetalleproducto = await ModeloDetalleProducto.findOne({
            where:{
                id:id,
            }
        });
        if(!buscardetalleproducto){
            res.send("El id no existe");
        }
        else{
            await ModeloDetalleProducto.destroy({
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