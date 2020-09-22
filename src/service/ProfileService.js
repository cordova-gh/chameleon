const Entity = require('../models/Profile');
const Service = require('./Service');
class ProfileService extends Service {

  async getAllPaginated(request) {
    const rowsPerPage = Number(request.query.rowsPerPage) || 10;
    const page = request.query.page || 1;
    const entities = await this.getEntitiesPagination(
      Entity,
      request,
      {},
      page,
      rowsPerPage,
      'codice'
    );
    const numOfEntities = await this.numEntitiesPagination(Entity, request, {});
    return {
      entities: entities,
      numOfEntities: numOfEntities,
      page: page,
      rowsPerPage: rowsPerPage
    }
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

module.exports = ProfileService;
