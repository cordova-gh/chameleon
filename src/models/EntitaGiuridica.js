const Indirizzo = require('./Indirizzo');
const mongoose = require('mongoose')
const { Schema } = mongoose;
const EntitaGiuridica = new Schema({
   ragioneSociale: String,
   descrAttivita: String,
   naturaGiur: String,
   indirizzoSedeLegale: Indirizzo,
   indirizzoCostituzione: Indirizzo,
   dataCostituzione: Date,
   capitaleSociale: Number,
   nrIscrCciaa: String,
   dataIscrCciaa: Date,
   provIscrCciaa: String

});

//module.exports = mongoose.model('EntitaGiuridica', EntitaGiuridica);