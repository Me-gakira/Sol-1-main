const mongoose = require('mongoose');
const precio = require("./precio");
const categoria = require("./categoria");

const productoSchema = mongoose.Scheme({
    nombre: String,
    descripcion: String,
    precio: {type: mongoose.Schema.ObjectId, ref: 'Precio'},
    categoria: {type: mongoose.Schema.ObjectId, ref: 'Categoria'}
});

module.exports = mongoose.model('Producto', productoSchema);