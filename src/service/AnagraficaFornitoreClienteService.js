const Entity = require('../models/Anagrafica');
const Service = require('./Service');
class AnagraficaFornitoreClienteService extends Service {
  async getAllPaginated(request) {
    const rowsPerPage = Number(request.query.rowsPerPage) || 10;
    const page = request.query.page || 1;
    const filterBase = {
      $or: [{ isFornitore: true }, { isCliente: true }],
    };
    const entities = await this.getEntitiesPagination(Entity, request, filterBase, page, rowsPerPage, 'codice');
    const numOfEntities = await this.numEntitiesPagination(Entity, request, filterBase);
    return {
      entities: entities,
      numOfEntities: numOfEntities,
      page: page,
      rowsPerPage: rowsPerPage
    }
  }

  async getAll(request) {
    return  await this.findAll(Entity, request, res, 'codice descrizione', 'descrizione');
  }

  async getById(id) {
    return await this.findById(Entity, id);
  }

  async create(body) {
    const entity = new Entity(body);
    return await entity.save();
  }
  
  async updateById(id, body) {
    await Entity.findByIdAndUpdate(id, body);
  }

  async deleteById(id) {
    await Entity.findByIdAndRemove(id);
  }
}

module.exports = AnagraficaFornitoreClienteService;
