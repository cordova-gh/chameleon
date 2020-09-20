
const mongoose = require('mongoose')
const { Schema } = mongoose;
const MovimentoInventario = new Schema({
  prodotto: { type: Schema.Types.ObjectId, ref: 'Prodotto' }
  , dataRegistrazione: Date
   , segnoMovimento: Number
   , causaleMovimento: String
   , quantita: Number
   , dtaScadenza: Date
   , note: String
   , fornitore: { type: Schema.Types.ObjectId, ref: 'Anagrafica' },
});

module.exports = mongoose.model('MovimentoInventario', MovimentoInventario);

