const mongoose = require('mongoose');
const { Schema } = mongoose;
const InventarioMovimento = new Schema({
  articolo: { type: Schema.Types.ObjectId, ref: 'Articolo' },
  dataRegistrazione: Date,
  segno: { type: Schema.Types.ObjectId, ref: 'Dominio' },
  causale: { type: Schema.Types.ObjectId, ref: 'Dominio' },
  quantita: Number,
  dataScadenza: Date,
  note: String,
  fornitore: { type: Schema.Types.ObjectId, ref: 'Anagrafica' },
  created: {
    type: Date,
    default: Date.now,
  },
  createdBy: String,
  updated: {
    type: Date,
    default: Date.now,
  },
  updatedBy: String,
});

module.exports = mongoose.model('InventarioMovimento', InventarioMovimento);
