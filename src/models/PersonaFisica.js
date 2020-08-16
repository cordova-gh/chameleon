const Indirizzo = require('./Indirizzo');
const mongoose = require('mongoose')
const { Schema } = mongoose;
const PersonaFisica = new Schema({
   nome: String,
   cognome: String,
   sesso: String,
   dataNascita: String,
   indirizzoNascita: Indirizzo,
   cittadinanza: String

});

//module.exports = mongoose.model('PersonaFisica', PersonaFisica);