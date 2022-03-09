const sequelize = require ('sequelize');
const db = require('../configuraciones/db');

const Compra = db.define(
    'compras',
    {
        id:
        {
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        fechaCompra:
        {
            type: sequelize.DATE,
            allowNull: false,
        },

        totalCompra:
        {
            type: sequelize.DOUBLE,
            allowNull: false,
        },

    },

    {
        tableName: "compra", 
        timestamps: false, 

    }
);
module.exports=Compra;