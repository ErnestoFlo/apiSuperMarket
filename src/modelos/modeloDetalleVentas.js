const sequelize = require('sequelize');
const db = require('../configuraciones/db');

const DetalleVenta = db.define(
'detalleventa',{

    id:{
        type:sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,   

    },
    idVentas:{
         type: sequelize.INTEGER,
         allowNull:true,

    },
   
    idProducto:{
      type: sequelize.INTEGER,
      allowNull:true,
    },
  
    cantidad:{
        type:sequelize.DOUBLE,
        allowNull:true,
        defaultValue:true,
    },




},

{
    tableName:"detalleventas",//indicar el nombre de la tabla
    timestamps:false,
    
    
    
    
    }
    
)

module.exports=DetalleVenta;

