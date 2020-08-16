const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const Anagrafica = require('./Anagrafica');
const user = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: { type: String, select: false },
    stUtenza: String,
    profiloId: String,
    anagrafica:  { type: Schema.Types.ObjectId, ref: 'Anagrafica' },
    aziendaId: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }

});

user.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

user.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this, password);
}

module.exports = mongoose.model('User', user);