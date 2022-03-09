const ModeloDetalleCompra = require("../modelos/modeloDetalleCompra");

exports.inicio = (req, res) => {
    res.send("Esto es el inicio del módulo de detalle de la compra");
};

exports.listarDetalleCompra = async (req, res) => { 
    const listaDetalle = await ModeloDetalleCompra.findAll(); 
    if(listaDetalle.length == 0){
        res.send("No existen datos");
    }
    else
    {
        res.json(listaDetalle);
    }
};

exports.guardarDetalleCompra = async (req, res) => {
    const {precio, idProducto, idProveedor, idCompra } = req.body;
    if(!precio || !idProducto || !idProveedor || !idCompra)
    {
        res.send("Debe enviar los datos completos");
    }
    else
    {
        await ModeloDetalleCompra.create({
            precio: precio,
            idProducto: idProducto,
            idProveedor: idProveedor,
            idCompra: idCompra
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

exports.modificarDetalleCompra = async (req, res) => {
    const { id } = req.query;
    const { precio, cantidad, idProducto, idProveedor, idCompra } = req.body;

    if(!id || !precio || !cantidad || !idProducto || !idProveedor || !idCompra)
    {
        res.send("Envie los datos completos");
    }
    else
    {
        var buscarDetalleCompra = await ModeloDetalleCompra.findOne({
            where:{
                id: id,
            }
        });
        if(!buscarDetalleCompra)
        {
            res.send("El id no existe");
        }
        else
        {
            buscarDetalleCompra.precio = precio;
            buscarDetalleCompra.cantidad = cantidad;
            buscarDetalleCompra.idProducto = idProducto;
            buscarDetalleCompra.idProveedor = idProveedor;
            buscarDetalleCompra.idCompra= idCompra;
            await buscarDetalleCompra.save() //peticion a la base de datos para guaradar la infromacion 
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

exports.eliminarDetalleCompra = async (req, res) => {
    const { id } = req.query;

    if(!id)
    {
        res.send("Envie el id de registro");
    }
    else
    {
            await ModeloDetalleCompra.destroy({
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