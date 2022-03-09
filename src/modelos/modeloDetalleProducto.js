const sequelize =  require('sequelize');
const db = require('../configuraciones/db');

const DetalleProducto = db.define(
    "detalleProducto",
    {
        id:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        codigoBarra:{
            type: sequelize.INTEGER,
            allowNull: false,
        },
        fechaVencimiento:{
            type: sequelize.DATE,
            allowNull: true,
        },
        fechaElaboracion:{
            type: sequelize.DATE,
            allowNull: false,
        },
        idProducto:{
            type: sequelize.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "detalleProducto",
        timestamps: false,
    }
);
module.exports=DetalleProducto;