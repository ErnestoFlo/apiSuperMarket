const ModeloDetalleVentas = require('../modelos/modeloDetalleVentas');
const msj = require('../componentes/mensaje');
const{ validationResult } = require('express-validator');

exports.inicio=(req,res)=>{
  res.send("Esto es el iniicio del modulo detalle de Ventas");
     
}

exports.listar = async (req,res) =>{
    const listarDetalleVentas= await ModeloDetalleVentas.findAll();
    if(listarDetalleVentas.length ==0){
         res.send('No existen Datos');   
    }else{
        res.json(listarDetalleVentas);
        
    }
}

exports.guardar = async (req,res) =>{
  const validacion = validationResult(req);
  const {idVentas, idProducto,cantidad} = req.body;
  console.log(idVentas);
  if(!idVentas ){
    console.log(idVentas);
    //res.send('Tiene que enviar los datos completos');
    msj("Tiene que enviar los datos completos", 200, validacion.array(), res);

  }else{
    await ModeloDetalleVentas.create({
      idVentas:idVentas,
      idProducto:idProducto,
      cantidad:cantidad,

    })
    .then((data)=>{
      console.log(data);
     //res.send("detalle de Venta Guardada Con exito");
      msj("detalle de Venta Guardada Con exito", 200, validacion.array(), res);

    })
    .catch((error)=>{
      console.log(error);
      //res.send("Error al guardar los datos")
      msj("Error al guardar los datos", 200, validacion.array(), res);
      
    });
  }

};
exports.modificar = async (req, res) => {

  const {id} = req.query;
  const {idVentas, idProducto,cantidad} = req.body;
  console.log(idVentas);
  if(!idVentas){
    console.log(idVentas);
      res.send("Envie los datos completos");
  }
  else{
      var buscardetalleventas = await ModeloDetalleVentas.findOne({
          where:{
              id:id,
             }
      });
      if(!buscardetalleventas){
          res.send("El id no existe");
      }
      else{
          buscardetalleventas.idVentas=idVentas;
          buscardetalleventas.idProducto =idProducto;
          buscardetalleventas.cantidad=cantidad;
        
 

          await buscardetalleventas.save()
          .then((data)=>{
              console.log(data);
              res.send("detalle venta se actualizo Correctamente");
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
      var buscardetalleventas = await ModeloDetalleVentas.findOne({
          where:{
              id:id,
             }
      });
      if(!buscardetalleventas){
          res.send("El id no existe");
      }
      else{

        await ModeloDetalleVentas.destroy({
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