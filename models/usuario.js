const mongoose = require('mongoose');

const usuarioSchema = mongoose.Scheme({
    nombre: String,
    pass: String
});

module.exports = mongoose.model('Usuario', usuarioSchema);