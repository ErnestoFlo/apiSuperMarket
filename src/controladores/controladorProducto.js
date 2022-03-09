const ModeloProducto = require('../modelos/modeloProducto');
exports.inicio = (req, res) => {
    res.send("Esto es el inicio de el modulo de productos");
};

exports.listar = async (req, res) => {
    const listaProductos = await ModeloProducto.findAll();
    if(listaProductos.length==0){
        res.send("No existen datos");
    }
    else{
        res.json(listaProductos);
    }
};

exports.guardar = async (req, res) => {
    const {nombre, idTipo, idmarca, precioCompra, precioVenta, medida, descripcion, imagen} = req.body;
    if(!nombre || !idTipo || !idmarca || !precioCompra || !precioVenta){
        res.send("Debe enviar los datos completos");
    }
    else{
        await ModeloProducto.create({
            nombre: nombre,
            idTipo: idTipo,
            idmarca: idmarca,
            precioCompra: precioCompra,
            precioVenta: precioVenta,
            medida: medida,
            descripcion: descripcion,
            imagen: imagen
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
    const {nombre, idTipo, idmarca, precioCompra, precioVenta, medida, descripcion, imagen} = req.body;
    if(!nombre || !idTipo || !idmarca || !precioCompra || !precioVenta){
        res.send("Envie los datos completos");
    }
    else{
        var buscarproducto = await ModeloProducto.findOne({
            where:{
                id:id,
            }
        });
        if(!buscarproducto){
            res.send("El id no existe");
        }
        else{
            buscarproducto.nombre=nombre;
            buscarproducto.idTipo=idTipo;
            buscarproducto.idmarca=idmarca;
            buscarproducto.precioCompra=precioCompra;
            buscarproducto.precioVenta=precioVenta;
            buscarproducto.medida=medida;
            buscarproducto.descripcion=descripcion;
            buscarproducto.imagen=imagen;

            await buscarproducto.save()
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
        var buscarproducto = await ModeloProducto.findOne({
            where:{
                id:id,
            }
        });
        if(!buscarproducto){
            res.send("El id no existe");
        }
        else{
            await ModeloProducto.destroy({
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