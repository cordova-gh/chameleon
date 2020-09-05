
const mongoose = require('mongoose');
const { Schema } = mongoose;
const Company = new Schema({
   codice: String
   , descrizione: String
   , anagrafica:  { type: Schema.Types.ObjectId, ref: 'Anagrafica' }
   , created: {
      type: Date,
      default: Date.now
   },
   updated: {
      type: Date,
      default: Date.now
   }
});
module.exports = mongoose.model('Company', Company);