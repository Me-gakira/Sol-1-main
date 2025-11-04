const mongoose = require('mongoose');
const producto = require("./producto");

const precioSchema = mongoose.Scheme({
    fecha: timestamp,
    precio: int,
    producto: {type: mongoose.Schema.ObjectId, ref: 'Producto'}
});

module.exports = mongoose.model('Precio', precioSchema);