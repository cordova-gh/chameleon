
const mongoose = require('mongoose')
const { Schema } = mongoose;
const Prodotto = new Schema({
    descrizioneBreve: String
   , img: String
   , tipologiaProdotto: String // abbigliamento, scarpe
   , categoriaProdotto: String // es.BEVANDE
   , sottoCategoriaProdotto: String // es.LIQUORI
 /*  , provenienza: { type: Schema.Types.ObjectId, ref: 'Counrtry' }
   , marca: { type: Schema.Types.ObjectId, ref: 'Marca' }
   , unitaMisura: { type: Schema.Types.ObjectId, ref: 'UnitaMisura' }*/
   , codiceBarre: String
});



