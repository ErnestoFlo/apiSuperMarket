const passport = require('passport');
const ModeloUsuario = require('../modelos/modeloUsuario');
const estrategiaJWT = require('passport-jwt').Strategy;
const extraertJWT = require('passport-jwt').ExtractJwt;
const JWT = require('jsonwebtoken');
const moment = require('moment');
const duracion = moment.duration(50, "minutos").asSeconds();
const clave = "MiClaveSegura";

exports.getToken = (data) =>{
    return JWT.sign(data, clave, {expiresIn: duracion});
};

const opciones ={};
opciones.jwtFromRequest = extraertJWT.fromAuthHeaderAsBearerToken();
opciones.secretOrKey = clave;

passport.use(new estrategiaJWT(opciones, async(paylad, done)=>{
   return await ModeloUsuario.findOne({
       where:{
           id: paylad.id,
           estado: true,
       }
   }) 

   .then((data) => {
       return done(null, data.id);
   })
   .catch((error) =>{
        return done(null, false);
   });
}));

exports.validarAutenticado = passport.authenticate('jwt', {session: false, 
failureRedirect: '/api/autenticacion/error',});