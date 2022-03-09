const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const bcrypt = require('bcrypt');

const Usuario = db.define(
    "usuario", 
    {
        id:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        username:{
            type: sequelize.STRING(45),
            allowNull: false,
        },
        correo:{
            type: sequelize.STRING(50),
            allowNull: false,
        },
        contrasena:{
            type: sequelize.STRING(250),
            allowNull: false,
        },
        idtipo:{
            type: sequelize.INTEGER,
            allowNull: false,
        },
        puntos:{
            type: sequelize.INTEGER,
            allowNull: true,
            defaultvalue: 0,
        },
        idRegistro:{
            type: sequelize.INTEGER,
            allowNull: false,
        },
        telefono:{
            type: sequelize.STRING(12),
            allowNull: true,
        },
        estado:{
            type: sequelize.BOOLEAN,
            allowNull: false,
            defaultvalue: true,
        },
        idPersona:{
            type: sequelize.STRING(15),
            allowNull: false,
        },
    },
    {
        tableName: "usuario",
        timestamps: false,

        hooks:{
            beforeCreate(usuario){
                const hash = bcrypt.hashSync(usuario.contrasena,10);
                usuario.contrasena = hash
            },
            beforeUpdate(usuario){
                const hash = bcrypt.hashSync(usuario.contrasena,10);
                usuario.contrasena = hash
            }
        }
    }
);

Usuario.prototype.VerificarContrasena = (con, com) =>{
    return bcrypt.compareSync(con, com)
}

module.exports  = Usuario;