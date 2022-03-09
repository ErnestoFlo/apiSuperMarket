const sequelize =  require('sequelize');
const db = require('../configuraciones/db');

const Marca = db.define(
    "marca",
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
        tableName: "marca",
        timestamps: false,
    }
);
module.exports=Marca;