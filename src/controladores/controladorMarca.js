const ModeloMarca = require('../modelos/modeloMarca');
exports.inicio = (req, res) => {
    res.send("Esto es el inicio de el modulo de marcas");
};

exports.listar = async (req, res) => {
    const listaMarca = await ModeloMarca.findAll();
    if(listaMarca.length==0){
        res.send("No existen datos");
    }
    else{
        res.json(listaMarca);
    }
};

exports.guardar = async (req, res) => {
    const {nombre} = req.body;
    if(!nombre){
        res.send("Debe enviar los datos completos");
    }
    else{
        await ModeloMarca.create({
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
        var buscarmarca = await ModeloMarca.findOne({
            where:{
                id:id,
            }
        });
        if(!buscarmarca){
            res.send("El id no existe");
        }
        else{
            buscarmarca.nombre=nombre;   

            await buscarmarca.save()
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
        var buscarmarca = await ModeloMarca.findOne({
            where:{
                id:id,
            }
        });
        if(!buscarmarca){
            res.send("El id no existe");
        }
        else{
            await ModeloMarca.destroy({
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