const mongoose = require('mongoose');

const pedidoSchema = mongoose.Scheme({
    estado: {type: mongoose.Schema.ObjectId, ref: 'Estado'},
    direccion: String,
    carro: {type: mongoose.Schema.ObjectId, ref: 'Carro'},
    metodoPago: {type: mongoose.Schema.ObjectId, ref: 'MetodoPago'},
    total: int,
    fechaPedido: timestamp
});

module.exports = mongoose.model('Pedido', pedidoSchema);