
const mongoose = require('mongoose')
const { Schema } = mongoose;
const Indirizzo = new Schema({
   via: String,
   numero: String,
   cap: String,
   comune: String,
   provincia: String,
   stato: { type: Schema.Types.ObjectId, ref: 'Country' }
});
