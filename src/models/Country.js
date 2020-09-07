const mongoose = require('mongoose');
const { Schema } = mongoose;
const Country = new Schema({
  codIsoStato: String,
  descrizione: String,
  flagUe: {
    type: Boolean,
    default: false,
  },
  flagUem: {
    type: Boolean,
    default: false,
  },
  flagOcse: {
    type: Boolean,
    default: false,
  },
  flagCrs: {
    type: Boolean,
    default: false,
  },
  flagIban: {
    type: Boolean,
    default: false,
  },
  lunghezzaIban: String,
  cittadinanza: String,
  dtaInizioValidita: Date,
  dtaFineValidita: Date,
});
module.exports = mongoose.model('Country', Country);
