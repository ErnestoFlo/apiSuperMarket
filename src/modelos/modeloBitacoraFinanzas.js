const { Sequelize } = require('sequelize');
const sequelize = require('sequelize');
const db = require('../configuraciones/db');

const BitacoraFinanzas = db.define(
    'bitacoraFinanza',
    {
        id:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        fechaTransaccion:{
            type:sequelize.DATE,
            allowNull: true,
        },
        tipoTransaccion:{
            type:sequelize.TINYINT(1),
            allowNull: true,
        },
        idCompra:{
            type:sequelize.INTEGER,
            allowNull: true,
        },
        idVenta:{
            type:sequelize.INTEGER,
            allowNull: true,
        },
    },
    {
        tableName: "bitacorafinanza",
        timestamps: false,
    },
);



module.exports = BitacoraFinanzas;