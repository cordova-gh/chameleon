const mongoose = require('mongoose');
const { Schema } = mongoose;
const InventarioShopMovimento = new Schema({
  shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
  dataRegistrazione: Date,
  inventarioMovimentoOrig: {
    type: Schema.Types.ObjectId,
    ref: 'InventarioMovimento',
  },
  quantita: Number,
  segno: { type: Schema.Types.ObjectId, ref: 'Dominio' },
  causale: { type: Schema.Types.ObjectId, ref: 'Dominio' },
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

module.exports = mongoose.model(
  'InventarioShopMovimento',
  InventarioShopMovimento
);
