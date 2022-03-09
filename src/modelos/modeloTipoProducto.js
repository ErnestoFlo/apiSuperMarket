const sequelize =  require('sequelize');
const db = require('../configuraciones/db');

const TipoProducto = db.define(
    "tipoProducto",
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
    },
    {
        tableName: "tipoProducto",
        timestamps: false,
    }
);
module.exports=TipoProducto;