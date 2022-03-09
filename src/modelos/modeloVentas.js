const sequelize = require('sequelize');
const db = require('../configuraciones/db');

const Venta = db.define(
'venta',{

    id:{
        type:sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,   

    },
    fechaVentas:{
         type: sequelize.DATE,
         allowNull:true,

    },
   
    idEmpleado:{
      type: sequelize.STRING(),
      allowNull:true,
    },
  
    estado:{
        type:sequelize.BOOLEAN,
        allowNull:true,
        defaultValue:true,
    },




},

{
    tableName:"ventas",//indicar el nombre de la tabla
    timestamps:false,
    
    
    
    
    }
    
)

module.exports=Venta;

