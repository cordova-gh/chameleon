const mongoose = require('mongoose');
const { Schema } = mongoose;
const Prodotto = require('./Prodotto');
const Articolo = new Schema({
    codice: String
    , descrizione: String
    , tipologiaArticolo: String // se è prodotto, servizio o altro
    , prodotto: Prodotto
    , aziendaId: String

});
module.exports = mongoose.model('Articolo', Articolo);


