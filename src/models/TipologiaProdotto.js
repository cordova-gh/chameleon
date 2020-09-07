
const mongoose = require('mongoose')
const { Schema } = mongoose;
const TipologiaProdotto = new Schema({
   codice: String
   , descrizione: String
   , img: Buffer
});


module.exports = mongoose.model('TipologiaProdotto', TipologiaProdotto);