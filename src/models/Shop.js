const mongoose = require('mongoose');
const Indirizzo = require('./Indirizzo');
const { Schema } = mongoose;
const Shop = new Schema({
    codice: String,
    descrizione: String,
    indirizzo: Indirizzo,
    telefono: String,
    cellulare: String,
    cellulare2: String, 
    orario: String,
    note: String,
    aziendaId: String,
    created: {
        type: Date,
        default: Date.now
    },
    createdBy: String,
    updated: {
        type: Date,
        default: Date.now
    },
    updatedBy: String
});
module.exports = mongoose.model('Shop', Shop);