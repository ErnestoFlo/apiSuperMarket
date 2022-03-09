const ModeloTipoProducto = require('../modelos/modeloTipoProducto');
exports.inicio = (req, res) => {
    res.send("Esto es el inicio de el modulo de tipo de producto");
};

exports.listar = async (req, res) => {
    const listaTipoProducto = await ModeloTipoProducto.findAll();
    if(listaTipoProducto.length==0){
        res.send("No existen datos");
    }
    else{
        res.json(listaTipoProducto);
    }
};

exports.guardar = async (req, res) => {
    const {nombre} = req.body;
    if(!nombre){
        res.send("Debe enviar los datos completos");
    }
    else{
        await ModeloTipoProducto.create({
            nombre: nombre,
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
    const {nombre} = req.body;
    if(!nombre){
        res.send("Envie los datos completos");
    }
    else{
        var buscartipoproducto = await ModeloTipoProducto.findOne({
            where:{
                id:id,
            }
        });
        if(!buscartipoproducto){
            res.send("El id no existe");
        }
        else{
            buscartipoproducto.nombre=nombre;   

            await buscartipoproducto.save()
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
        var buscartipoproducto = await ModeloTipoProducto.findOne({
            where:{
                id:id,
            }
        });
        if(!buscartipoproducto){
            res.send("El id no existe");
        }
        else{
            await ModeloTipoProducto.destroy({
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