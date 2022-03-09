const sequelize = require('sequelize');
const db = require('../configuraciones/db');

const Finanzas = db.define(
    'finanzas',
    {
        id:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        monto:{
            type:sequelize.DOUBLE,
            allowNull: false,
        },
        finanzascol:{
            type:sequelize.STRING(45),
            allowNull: true,
        },
    },
    {
        tableName: "finanzas",
        timestamps: false,
    },
);

module.exports = Finanzas;