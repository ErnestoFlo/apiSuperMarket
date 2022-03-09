const ModeloProveedor = require("../modelos/modeloProveedor");

exports.inicio = (req, res) => {
    res.send("Esto es el inicio del módulo de Proveedor");
};

exports.listarProveedor = async (req, res) => { 
    const listaProveedor = await ModeloProveedor.findAll(); 
    if(listaProveedor.length == 0){
        res.send("No existen datos");
    }
    else
    {
        res.json(listaProveedor);
    }
};

exports.guardarProveedor = async (req, res) => {
    const { nombre, empresa, numeroA } = req.body;
    if(!nombre || !empresa || !numeroA)
    {
        res.send("Debe enviar los datos completos");
    }
    else
    {
        await ModeloProveedor.create({
            nombre: nombre,
            empresa: empresa,
            numeroA: numeroA
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

exports.modificarProveedor = async (req, res) => {
    const { id } = req.query;
    const { nombre, empresa, numeroA, numeroB, correo, imagen } = req.body;

    if(!id || !nombre || !empresa || !numeroA || !numeroB || !correo || !imagen)
    {
        res.send("Envie los datos completos");
    }
    else
    {
        var buscarProveedor = await ModeloProveedor.findOne({
            where:{
                id: id,
            }
        });
        if(!buscarProveedor)
        {
            res.send("El id no existe");
        }
        else
        {
            buscarProveedor.nombre = nombre;
            buscarProveedor.empresa = empresa;
            buscarProveedor.numeroA = numeroA;
            buscarProveedor.numeroB = numeroB;
            buscarProveedor.correo = correo;
            buscarProveedor.imagen = imagen;
            await buscarProveedor.save() //peticion a la base de datos para guaradar la infromacion 
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

exports.eliminarProveedor = async (req, res) => {
    const { id } = req.query;

    if(!id)
    {
        res.send("Envie el id de registro");
    }
    else
    {
            await ModeloProveedor.destroy({
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