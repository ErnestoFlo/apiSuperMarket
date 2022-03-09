const sequelize =  require('sequelize');
const db = require('../configuraciones/db');

const Devoluciones = db.define(
    "devoluciones",
    {
        id:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        idProducto:{
            type: sequelize.INTEGER,
            allowNull: false,
        },
        cantidad:{
            type: sequelize.DECIMAL,
            allowNull: false,
        },
        fechaDevolucion:{
            type: sequelize.DATE,
            allowNull: false,
        },
    },
    {
        tableName: "devoluciones",
        timestamps: false,
    }
);
module.exports=Devoluciones;