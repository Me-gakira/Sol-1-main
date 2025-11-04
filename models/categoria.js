const mongoose = require('mongoose');

const categoriaSchema = mongoose.Scheme({
    nombre: String,
    descripcion: String,
    esAlergeno: bool
});

module.exports = mongoose.model('Categoria', categoriaSchema);