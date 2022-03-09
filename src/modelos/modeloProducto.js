const sequelize =  require('sequelize');
const db = require('../configuraciones/db');

const Producto = db.define(
    "producto",
    {
        id:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre:{
            type: sequelize.STRING(45),
            allowNull: false,
        },
        idTipo:{
            type: sequelize.INTEGER,
            allowNull: false,
        },
        idmarca:{
            type: sequelize.INTEGER,
            allowNull: false,
        },
        descripcion:{
            type: sequelize.STRING(200),
            allowNull: true,
        },
        medida:{
            type: sequelize.STRING(45),
            allowNull: true,
        },
        precioCompra:{
            type: sequelize.DOUBLE,
            allowNull: false,
        },
        precioVenta:{
            type: sequelize.DOUBLE,
            allowNull: false,
        },
        imagen:{
            type: sequelize.STRING(200),
            allowNull: true,
        },
    },
    {
        tableName: "producto",
        timestamps: false,
    }
);
module.exports=Producto;