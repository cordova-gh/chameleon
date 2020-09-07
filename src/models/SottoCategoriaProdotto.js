
const mongoose = require('mongoose')
const { Schema } = mongoose;
const SottoCategoriaProdotto = new Schema({
   codice: String
   , descrizione: String
   , categoriaProdotto: String
   , img: Buffer
});


module.exports = mongoose.model('SottoCategoriaProdotto', SottoCategoriaProdotto);