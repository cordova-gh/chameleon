
const mongoose = require('mongoose')
const { Schema } = mongoose;
const MovimentoInventarioShop = new Schema({
   dataRegistrazione: Date
   , inventarioId: String
   , segnoMovimento: Number
   , causaleMovimento: String
   , quantita: Number
   
});

module.exports = mongoose.model('MovimentoInventarioShop', MovimentoInventarioShop);

