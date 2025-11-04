const mongoose = require('mongoose');
const perfil = require("./perfil");

const usuarioSchema = mongoose.Scheme({
    nombre: String,
    correo: String,
    pass: String,
    perfil: {type: mongoose.Schema.ObjectId, ref: 'Perfil'}
});

module.exports = mongoose.model('Usuario', usuarioSchema);