
const mongoose = require('mongoose')
const { Schema } = mongoose;
const MovimentoInventario = new Schema({
     dataRegistrazione: Date
   , inventarioId: String
   , segnoMovimento: Number
   , causaleMovimento: String
   , quantita: Number
   
});

module.exports = mongoose.model('MovimentoInventario', MovimentoInventario);

