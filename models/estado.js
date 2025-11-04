const mongoose = require('mongoose');
const pedido = require("./pedido");

const estadoSchema = mongoose.Scheme({
    fecha: timestamp,
    estado: String,
    pedido: {type: mongoose.Schema.ObjectId, ref: 'Pedido'}
});

module.exports = mongoose.model('Estado', estadoSchema);