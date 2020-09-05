
const mongoose = require('mongoose')
const { Schema } = mongoose;
const Riferimento = new Schema({
   nomeReferente: String,
   telefonoReferente: String,
   cellulareReferente: String,
   emailReferente: String,
});

