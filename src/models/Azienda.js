
const mongoose = require('mongoose');
const { Schema } = mongoose;
const Azienda = new Schema({
   codice: String
   , descrizione: String
   , anagraficaId: String
   , created: {
      type: Date,
      default: Date.now
   },
   updated: {
      type: Date,
      default: Date.now
   }
});
module.exports = mongoose.model('Azienda', Azienda);