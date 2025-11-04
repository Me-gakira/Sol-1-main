const mongoose = require('mongoose');

const metodoPagoSchema = mongoose.Scheme({
    infoTarjeta: String,
    infoCuenta: String,
    pass: String
});

module.exports = mongoose.model('MetodoPago', metodoPagoSchema);