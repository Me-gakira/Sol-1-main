const mongoose = require('mongoose');
const producto = require("./producto");

const itemCarroSchema = mongoose.Scheme({
    carro: {type: mongoose.Schema.ObjectId, ref: 'Carro'},
    producto: {type: mongoose.Schema.ObjectId, ref: 'Producto'},
    cantidad: int
});

module.exports = mongoose.model('ItemCarro', itemCarroSchema);