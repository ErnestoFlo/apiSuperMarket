//estabelcer la conexion con la base de datos 
const sequelize = require ('sequelize');
const db = new sequelize (
    'baseSuperMarket', //nombre de la base de datos
    'root', //ususario de la base de datos 
    'password', // contraseña del usuario
    {
        host: '127.0.0.1', // este es el servidor
        dialect: 'mysql',  //lenguaje de la base de datos
        port: '3306', //puerto (es este caso el de mysql)
    }
);
module.exports = db;