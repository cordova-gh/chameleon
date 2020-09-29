const Entity = require('../models/InventarioShopMovimento');
const Service = require('./Service');
const ProdottoService = require('./ProdottoService');
const prodottoService = new ProdottoService();

const mongoose = require('mongoose');
class InventarioShopMovimentoService extends Service {

  async getAllPaginated(request) {
    const page = request.query.page || 1;
    const rowsPerPage = Number(request.query.rowsPerPage) || 10;
    const entities = await this.getEntitiesPagination(
      Entity,
      request,
      {},
      page,
      rowsPerPage,
      '',
      'articolo segno causale'
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

  async findByInventarioMovimentoOrig(inventarioMovimentoOrig) {
    return await this.findByField(Entity, 'inventarioMovimentoOrig', inventarioMovimentoOrig);
  }


  async create(body) {
    const entity = new Entity(body);
    return await entity.save();
  }

  async saveCarico(inventarioMovimento, inventarioShopMovimentos) {
    const movimentos = inventarioShopMovimentos;
    await movimentos.forEach(movimento => {
      const entity = new Entity();
      entity.dataRegistrazione = Date.now();
      entity.shop = movimento.shop;
      entity.quantita = movimento.quantita;
      // giro negozio
      entity.causale = '5f67e3326a0cf0b8ec9e4ac3';
      entity.inventarioMovimentoOrig = inventarioMovimento;
      // avere
      entity.segno = '5f67d80de3964500045d0d70';
      return  entity.save();
    });
  }





  async updateById(id, body) {
    await Entity.findByIdAndUpdate(id, body);
  }

  async deleteById(id) {
    await Entity.findByIdAndRemove(id);
  }
}

module.exports = InventarioShopMovimentoService;
