const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const user = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: { type: String, select: false },
    anagrafica:  { type: Schema.Types.ObjectId, ref: 'Anagrafica' },
    stUtenza: { type: Schema.Types.ObjectId, ref: 'Dominio' },
    profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
    azienda: { type: Schema.Types.ObjectId, ref: 'Company' },
    shops: Array,
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