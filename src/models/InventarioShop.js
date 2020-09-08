
const mongoose = require('mongoose')
const { Schema } = mongoose;
const InventarioShop = new Schema({
   inventario: { type: Schema.Types.ObjectId, ref: 'Inventario' },
   shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
   quantita: Number,
   note: String,
   aziendaId: { type: Schema.Types.ObjectId, ref: 'Azienda' }
});

module.exports = mongoose.model('InventarioShop', InventarioShop);

