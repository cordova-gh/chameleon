const Entity = require('../models/Articolo');
const Service = require('./Service');
class ProdottoService extends Service {

  async getAllPaginated(request) {
    const rowsPerPage = Number(request.query.rowsPerPage) || 10;
    const page = request.query.page || 1;
    // /*.populate({path:'prodotto.provenienza', 'model':'Country', select:'codiceIsoStato descrizione'})
    // .populate({path:'prodotto.marca', 'model':'Marca', select:'codice descrizione'})*/
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

  async getAll(request, response) {
    return await this.getAll(Entity, request, response, 'codice descrizione', 'descrizione');
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

module.exports = ProdottoService;
