const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Entity = require('../models/User');
const Anagrafica = require('../models/Anagrafica');
const Service = require('./Service');

class UserService extends Service {
  async getAllPaginated(request) {
    const rowsPerPage = Number(request.query.rowsPerPage) || 10;
    const page = request.query.page || 1;
    const entities = await Entity.find()
      .populate('anagrafica profile azienda stUtenza')
      .skip(rowsPerPage * page - rowsPerPage)
      .limit(rowsPerPage);

    const numOfEntities = await Entity.countDocuments();
    return {
      entities: entities,
      numOfEntities: numOfEntities,
      page: page,
      rowsPerPage: rowsPerPage
    }
  }
  async getAll(request) {
    return await this.findAll(Entity, request, res, 'codice descrizione', 'descrizione');
  }
  async getById(id) {
    return await this.findById(Entity, id);
  }

  async create(body) {
    const anagraficaId = await salvaAnagrafica(body.anagrafica);
    const entity = new Entity({
      email: body.email,
      password: bcrypt.hashSync(rbody.password, 10),
      anagrafica: anagraficaId,
      profile: body.profile,
      azienda: body.azienda,
      stUtenza: body.stUtenza,
    });
    await entity.save();
  }

  async updateById(id, body) {
    const user = body;
    const anagraficaId = await salvaAnagrafica(body.anagrafica);
    delete body.anagrafica;
    user['anagrafica'] = anagraficaId;
    return await Entity.findByIdAndUpdate(id, user);
  }

  async deleteById(id) {
    await Entity.findByIdAndRemove(id);
  }

  async salvaAnagrafica(anagraficaBody) {
    const id = anagraficaBody._id;
    if (id) {
      await Anagrafica.findByIdAndUpdate(id, anagraficaBody);
      return id;
    } else {
      let anagrafica = new Anagrafica(anagraficaBody);
      anagrafica.isUser = true;
      anagrafica.tipoAnagrafica = 'PF';
      await anagrafica.save(anagrafica);
      return anagrafica._id;
    }
  }
}
module.exports = UserService;
