
const mongoose = require('mongoose')
const { Schema } = mongoose;
const InventarioShop = new Schema({
   shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
   articolo: { type: Schema.Types.ObjectId, ref: 'Articolo' },
   quantita: Number,
   note: String,
});

module.exports = mongoose.model('InventarioShop', InventarioShop);

