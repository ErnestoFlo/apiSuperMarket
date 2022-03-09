const { Sequelize } = require('sequelize');
const sequelize = require('sequelize');
const db = require('../configuraciones/db');

const Contactos = db.define(
    'contactos',
    {
        id:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre:{
            type:sequelize.STRING,
            allowNull: true,
        },
        telefono:{
            type:sequelize.STRING(10),
            allowNull: true,
        },
        correo:{
            type:sequelize.STRING,
            allowNull: true,
        },
        mensaje:{
            type:sequelize.STRING,
            allowNull: false,
        },
        tipoMensaje:{
            type:sequelize.ENUM("sugerencia", "devolucion", "queja"),
            allowNull: true,
        },
        idUsuario:{
            type:sequelize.INTEGER,
            allowNull: true,
        },
    },
    {
        tableName: "contactos",
        timestamps: false,
    },
);



module.exports = Contactos;