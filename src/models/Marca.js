const mongoose = require('mongoose');
const { Schema } = mongoose;
const Marca = new Schema({
    codice: String,
    descrizione: String,
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
module.exports = mongoose.model('Marca', Marca);