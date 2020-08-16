const mongoose = require('mongoose');
const { Schema } = mongoose;
const Shop = new Schema({
    codice: String,
    denominazione: String,
    anagraficaId: String,
    aziendaId: String
    , created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    createBy: String,
    updatedBy: String
});
module.exports = mongoose.model('Shop', Shop);