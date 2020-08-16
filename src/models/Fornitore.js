
const mongoose = require('mongoose')
const { Schema } = mongoose;
const Fornitore = new Schema({
   nomeReferente: String,
   telefonoReferente: String,
   emailReferente: String,
   codTipoPagamento: String,
   modalitaPagamento: String

});

