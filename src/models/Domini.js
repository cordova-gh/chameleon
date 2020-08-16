const mongoose   = require('mongoose');
const {Schema} = mongoose;
const Domini  = new Schema({
    lingua   : Number,
    dominio: String,
    codice: String,
    descrizione: String,
    descrizione1: String,
    descrizione2: String,
    descrizione3: String,
    created: {
        type: Date,
        default: Date.now
     },
     updated: {
        type: Date,
        default: Date.now
     },
});
Domini.index({ lingua: 1, dominio: 1, codice:1 }, { unique: true });
module.exports = mongoose.model('Domini', Domini);