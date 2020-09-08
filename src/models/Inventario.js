
const mongoose = require('mongoose')
const { Schema } = mongoose;
const Inventario = new Schema({
    prodottoId: String,
    dataRegistrazione: Date,
    quantita: Number,
    prezzo: String,
    dtaScadenza: Date,
    note: String,
    fornitore: { type: Schema.Types.ObjectId, ref: 'Anagrafica' },
    aziendaId: { type: Schema.Types.ObjectId, ref: 'Azienda' }
});

module.exports = mongoose.model('Inventario', Inventario);

