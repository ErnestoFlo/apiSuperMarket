const express = require('express');
const morgan = require('morgan');
const rutas = require('./rutas/index');
const path = require('path');

require('dotenv').config();

const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.set('json spaces', 2);

app.use('/api/', rutas);

app.use('/api/detalleCompras', require('./rutas/rutasDetalleCompra')); 
app.use('/api/compras', require('./rutas/rutasCompra')); 
app.use('/api/proveedor', require('./rutas/rutasProveedor'));
app.use('/api/ventas/',require('./rutas/rutasVentas'));
app.use('/api/detalleventas/',require('./rutas/rutasDetalleVentas'));
app.use('/api/finanzas/', require('./rutas/rutasFinanzas'));
app.use('/api/bitacorafinanzas/', require('./rutas/rutasBitacoraFinanzas'));
app.use('/api/producto/', require('./rutas/rutasProducto'));
app.use('/api/detalleProducto/', require('./rutas/rutasDetalleProducto'));
app.use('/api/tipoProducto/', require('./rutas/rutaTipoProducto'));
app.use('/api/marca/', require('./rutas/rutasMarca'));
app.use('/api/devolucion/', require('./rutas/rutasDevolucion'));
app.use('/api/contactos/', require('./rutas/rutasContacto'));
app.use('/api/usuario/', require('./rutas/rutasUsuario'));
app.use('/api/autenticacion/', require('./rutas/rutasAutenticacion'));


app.listen(4001, ()=> {
    console.log("Servidor iniciado en el puerto 4001");
});