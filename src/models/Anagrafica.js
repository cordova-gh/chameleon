const Indirizzo = require('./Indirizzo');
const PersonaFisica = require('./PersonaFisica');
const EntitaGiuridica = require('./EntitaGiuridica');
const Fornitore = require('./Fornitore');
const mongoose = require('mongoose');
const { Schema } = mongoose;


const Anagrafica = new Schema({
   codice: String
   , descrizioneBreve: String
   , descrizione: String
   , tipoAnagrafica: String
   , stAnagrafica: String
   , codiceFiscale: String
   , partitaIva: String
   , partitaIvaEstera: String
   , telefono: String
   , cellulare: String
   , sae: String
   , rae: String
   , tae: String
   , pec: String
   , codiceAteco: String
   , titolo: String
   , indirizzoResidenza: Indirizzo
   , indirizzoResidenzaPrec: Indirizzo
   , indirizzoDomicilio: Indirizzo
   , personaFisica: PersonaFisica
   , entitaGiuridica: EntitaGiuridica
   , fornitore: Fornitore
   , isFornitore: {
      type: Boolean,
      default: false
   }, isCliente: {
      type: Boolean,
      default: false
   }, isCompany: {
      type: Boolean,
      default: false
   }, isUser: {
      type: Boolean,
      default: false
   },
   created: {
      type: Date,
      default: Date.now
   },
   updated: {
      type: Date,
      default: Date.now
   },
   createBy: String,
   updatedBy: String,
   aziendaId: String
});
module.exports = mongoose.model('Anagrafica', Anagrafica);