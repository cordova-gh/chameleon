
const mongoose = require('mongoose')
const { Schema } = mongoose;
const Inventario = new Schema({
    prodotto:  { type: Schema.Types.ObjectId, ref: 'Prodotto' },
    quantita: Number,
    dataUltimaEntrata: Date,
    aziendaId: { type: Schema.Types.ObjectId, ref: 'Azienda' }
});

module.exports = mongoose.model('Inventario', Inventario);

