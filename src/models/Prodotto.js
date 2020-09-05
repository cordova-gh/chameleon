
const mongoose = require('mongoose')
const { Schema } = mongoose;
const Prodotto = new Schema({
   codice: String
   , descrizione: String
   , descrizioneBreve: String
   , tipologiaProdotto: String
   , img: String
   , categoriaProdottoId: String // es.Alimentare
   , sottoCategoriaProdottoId: String // es.Bevande
   , unitaMisura: String
   , quantita: String
   , provenienza: String
   , marca: String
});

//module.exports = mongoose.model('Indirizzo', Indirizzo);