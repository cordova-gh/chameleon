const Entity = require('../models/Dominio');
const Service = require('./Service');
class DominioService extends Service {

  async getAllPaginated(request) {
    const rowsPerPage = Number(request.query.rowsPerPage) || 10;
    const page = request.query.page || 1;
    const entities = await this.getEntitiesPagination(
      Entity,
      request,
      {},
      page,
      rowsPerPage,
      'dominio'
    );
    const numOfEntities = await this.numEntitiesPagination(Entity, request, {});
    return {
      entities: entities,
      numOfEntities: numOfEntities,
      page: page,
      rowsPerPage: rowsPerPage
    }
  }

  async includes(request) {
    const dominiosToFind = request.query.domini.split(',');
    let query = Entity.find();
    query.where('dominio').in(dominiosToFind);
    const result = await query.exec();
    const entities = {};
    result.forEach((curDom) => {
      if (!entities[curDom.dominio]) {
        entities[curDom.dominio] = [];
      }
      entities[curDom.dominio].push(curDom);
    });
    return entities;
  }

  async getByDominio(request) {
    return await Entity.find({ dominio: request.params.dominio });
  }

  async getByDominioAndDescrizione(request) {
    let reg = new RegExp(request.params.descrizione + '.*');
    return await Entity.find({
      dominio: request.params.dominio,
      descrizione: reg,
    });
  }

  async getById(id) {
    return await this.findById(Entity, id);
  }

  async create(body) {
    const entity = new Entity(body);
    await entity.save();
  }

  async updateById(id, body) {
    await Entity.findByIdAndUpdate(id, body);
  }

  async deleteById(id) {
    await Entity.findByIdAndRemove(id);
  }
}

module.exports = DominioService;
