
const mongoose = require('mongoose')
const { Schema } = mongoose;
const MovimentoInventarioShop = new Schema({
   dataRegistrazione: Date
   , movimentoInventario: String
   , segno: Number
   , causale: String
   , quantita: Number
});

module.exports = mongoose.model('MovimentoInventarioShop', MovimentoInventarioShop);

