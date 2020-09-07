
const mongoose = require('mongoose')
const { Schema } = mongoose;
const Prodotto = new Schema({
    descrizioneBreve: String
   , img: String
   , tipologiaProdotto: String // abbigliamento, scarpe
   , categoriaProdotto: String // es.BEVANDE
   , sottoCategoriaProdotto: String // es.LIQUORI
   , provenienza: String
   , marca: String
   , fornitore: { type: Schema.Types.ObjectId, ref: 'Anagrafica' },
});



