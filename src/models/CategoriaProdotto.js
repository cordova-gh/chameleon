const mongoose = require('mongoose');
const { Schema } = mongoose;
const CategoriaProdotto = new Schema({
   codice: String
   , descrizione: String
   , img: Buffer
   , tipologiaProdotto: String
   , created: {
      type: Date,
      default: Date.now
   },
   updated: {
      type: Date,
      default: Date.now
   },
   aziendaId: String
});


module.exports = mongoose.model('CategoriaProdotto', CategoriaProdotto);
