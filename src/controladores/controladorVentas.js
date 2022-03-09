const ModeloVentas = require('../modelos/modeloVentas');
exports.inicio=(req,res)=>{
  res.send("Esto es el iniicio del modulo Ventas");
     
}

exports.listar = async (req,res) =>{
    const listaVentas= await ModeloVentas.findAll();
    if(listaVentas.length ==0){
         res.send('No existen Datos');   
    }else{
        res.json(listaVentas);
        
    }
}

exports.guardar = async (req,res) =>{
  
  const {fechaVentas, idCliente,idEmpleado,estado} = req.body;

  if(!fechaVentas || !idCliente||!idEmpleado||!estado){
    res.send("Debe enviar los datos completos");

  }else{
    await ModeloVentas.create({
      fechaVentas:fechaVentas,
      idCliente:idCliente,
      idEmpleado:idEmpleado,
      estado:estado
    })
    .then((data)=>{
      console.log(data);
      res.send("Venta Guardada Con exito");
    })
    .catch((error)=>{
      console.log(error);
      res.send("Error al guardar los datos")
    });
  }

};
exports.modificar = async (req, res) => {

  const {id} = req.query;
  const {fechaVentas, idCliente,idEmpleado,estado} = req.body;
  if(!fechaVentas || !idCliente||!idEmpleado||!estado){
      res.send("Envie los datos completos");
  }
  else{
      var buscarventas = await ModeloVentas.findOne({
          where:{
              id:id,
             }
      });
      if(!buscarventas){
          res.send("El id no existe");
      }
      else{
          buscarventas.fechaVentas=fechaVentas;
          buscarventas.idCliente=idCliente;
          buscarventas.idEmpleado=idEmpleado;
          buscarventas.estado=estado;
 

          await buscarventas.save()
          .then((data)=>{
              console.log(data);
              res.send("La venta se actualizo Correctamente");
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
  const {fechaVentas, idCliente,idEmpleado,estado} = req.body;
  if(!id){
      res.send("Envie el id del registro");
  }
  else{
      var buscarventas = await ModeloVentas.findOne({
          where:{
              id:id,
             }
      });
      if(!buscarventas){
          res.send("El id no existe");
      }
      else{

        await ModeloVentas.destroy({
          where:
          {id:id,
          }
        })
      
       
          .then((data)=>{
              console.log(data);
              res.send("Registro eliminado");
          })
          .catch((error)=>{
              console.log(error);
              res.send("Error al eliminar el registro");
          });
      }
  }
  
};