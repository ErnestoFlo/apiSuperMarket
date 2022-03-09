const sequelize = require ('sequelize');
const db = require('../configuraciones/db');

const Proveedor = db.define(
    'proveedores',
    {
        id:
        {
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        nombre:
        {
            type: sequelize.STRING(45),
            allowNull: false,
        },

        empresa:
        {
            type: sequelize.STRING(45),
            allowNull: false,
        },

        numeroA:
        {
            type: sequelize.STRING(12),
            allowNull: false,
        },

        numeroB:
        {
            type: sequelize.STRING(12),
            allowNull: true,
        },

        correo:
        {
            type: sequelize.STRING(50),
            allowNull: true,
        },

        imagen:
        {
            type: sequelize.STRING(250),
            allowNull: true,
        },
    },

    {
        tableName: "proveedor", 
        timestamps: false, 

    }
);
module.exports=Proveedor;