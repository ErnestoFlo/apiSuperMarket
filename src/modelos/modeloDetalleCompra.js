const sequelize = require ('sequelize');
const db = require('../configuraciones/db');

const DetalleCompra = db.define(
    'detalleCompra',
    {
        id:
        {
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        precio:
        {
            type: sequelize.DOUBLE,
            allowNull: false,
        },

        cantidad:
        {
            type: sequelize.INTEGER,
            allowNull: true,
        },

        idProducto:
        {
            type: sequelize.INTEGER,
            allowNull: false,
        },

        idProveedor:
        {
            type: sequelize.INTEGER,
            allowNull: false,
        },

        idCompra:
        {
            type: sequelize.INTEGER,
            allowNull: false,
        },
    },

    {
        tableName: "detalleCompra", 
        timestamps: false, 

    }
);
module.exports=DetalleCompra;