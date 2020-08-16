const mongoose = require('mongoose');
const { Schema } = mongoose;
const Profilo = new Schema({
    codice: String,
    descrizione: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Profilo', Profilo);