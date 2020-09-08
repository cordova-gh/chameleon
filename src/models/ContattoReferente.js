
const mongoose = require('mongoose')
const { Schema } = mongoose;
const ContattoReferente = new Schema({
   nome: String,
   telefono: String,
   cellulare: String,
   email: String,
});

