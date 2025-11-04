const mongoose = require('mongoose');
const usuario = require("./usuario");

const carroSchema = mongoose.Scheme({
    fecha: timestamp,
    usuario: {type: mongoose.Schema.ObjectId, ref: 'Usuario'},
    sesionkey: String,
    subtotal: int
});

module.exports = mongoose.model('Carro', carroSchema);