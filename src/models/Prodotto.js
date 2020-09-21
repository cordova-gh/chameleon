
const mongoose = require('mongoose')
const { Schema } = mongoose;
const Prodotto = new Schema({
    descrizioneBreve: String
   , img: String
   , tipologiaProdotto: String // abbigliamento, scarpe
   , categoriaProdotto: String // es.BEVANDE
   , sottoCategoriaProdotto: String // es.LIQUORI
   , provenienza: { type: Schema.Types.ObjectId, ref: 'Country' }
   , marca: { type: Schema.Types.ObjectId, ref: 'Marca' }
   , unitaMisura: { type: Schema.Types.ObjectId, ref: 'UnitaMisura' }
   , codiceBarre: String
   , quantita: Number
   , ultimoIngresso: Date
   , aziendaId: { type: Schema.Types.ObjectId, ref: 'Azienda' }
   , created: {
      type: Date,
      default: Date.now
    },
    createdBy: String,
    updated: {
      type: Date,
      default: Date.now
    },
    updatedBy: String
});



