const Entity = require('../models/InventarioMovimento');
const Service = require('./Service');

class InventarioMovimentoService extends Service {

  async getAllPaginated(request) {
    const page = request.query.page || 1;
    const rowsPerPage = Number(request.query.rowsPerPage) || 10;
    const entities = await this.getEntitiesPagination(
      Entity,
      request,
      {},
      page,
      rowsPerPage,
      ''
    );
    const numOfEntities = await this.numEntitiesPagination(Entity, request, {});
    return {
      entities: entities,
      numOfEntities: numOfEntities,
      page: page,
      rowsPerPage: rowsPerPage
    }
  }

  async getAll(request, response) {
    return await this.getAll(Entity, request, response, '', 'dataRegistrazione');
  }

  async getById(id) {
    return await this.findById(Entity, id);
  }

  async create(body) {
    const entity = new Entity(body);
    await entity.save();
  }

  async saveCarico(body) {
    const entity = new Entity(body);
    entity.dataRegistrazione = Date.now();
    // carico magazzino
    entity.causale = '5f67e35a6a0cf0b8ec9e4ac4';
    // avere
    entity.segno = '5f67d80de3964500045d0d70';
    await entity.save();
  }

  async updateById(id, body) {
    await Entity.findByIdAndUpdate(id, body);
  }

  async deleteById(id) {
    await Entity.findByIdAndRemove(id);
  }
}

module.exports = InventarioMovimentoService;
