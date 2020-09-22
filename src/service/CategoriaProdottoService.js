const Entity = require('../models/CategoriaProdotto');
const Service = require('./Service');
// const SottoCategoriaProdotto = require('../models/SottoCategoriaProdotto');
// const mongoose = require('mongoose');

class CategoriaProdottoService extends Service {
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
      rowsPerPage: rowsPerPage,
    };
  }

  // router.get('/sotto-categoria-prodottos/:idCategoria', async (req, res) => {
  //     const resPerPage = 10; // results per page
  //     const page = req.query.page || 1;
  //     let numOfEntities = 0;
  //     Entity.aggregate([
  //         { $match: { _id: new mongoose.Types.ObjectId(req.params.idCategoria) } },
  //         {
  //             $project: {
  //                 "numElements": { $size: "$sottoCategorias" }
  //             }
  //         }
  //     ]).exec(function (err, ret) {
  //         numOfEntities = ret[0].numElements;
  //     });

  //     Entity.aggregate([
  //         { $match: { _id: new mongoose.Types.ObjectId(req.params.idCategoria) } },
  //         {
  //             $project: {
  //                 sottoCategorias: {
  //                     $slice: ["$sottoCategorias"
  //                         , (resPerPage * page) - resPerPage, resPerPage]
  //                 }
  //             }
  //         }, {
  //             $unwind: "$sottoCategorias"
  //         }, {
  //             $sort: {
  //                 "sottoCategorias.codice": 1
  //             }
  //         },
  //         {
  //             $project: {
  //                 "sottoCategoria": "$sottoCategorias",

  //             }
  //         }]).exec(function (err, sottoCategorias) {
  //             // console.log('numero entities',numOfEntities);
  //             res.json({
  //                 entities: sottoCategorias,
  //                 currentPage: page,
  //                 pages: Math.ceil(numOfEntities / resPerPage),
  //                 // searchVal: searchQuery,
  //                 numOfResults: numOfEntities
  //             });
  //         });

  // });

  // router.get('/sotto-categoria-prodottos/:idCategoria/:id', async (req, res) => {

  //     Entity.aggregate(
  //         { $match: { _id: mongoose.Types.ObjectId(req.params.idCategoria) } },
  //         { $unwind: '$sottoCategorias' },
  //         { $match: { 'sottoCategorias._id': req.params.idCategoria } })
  // });

  // router.post('/sotto-categoria-prodottos/:idCategoria', async (req, res) => {
  //     const entity = await Entity.findById(req.params.idCategoria);
  //     entity.sottoCategorias.push(new SottoCategoriaProdotto({ codice: req.body.codice, descrizione: req.body.descrizione }));
  //     await entity.save();
  //     res.json({
  //         status: 'OK RICEVUTO'
  //     })
  // });

  async getById(id) {
    return await this.findById(Entity, id);
  }

  async create(body) {
    const entity = new Entity(body);
    return await entity.save();
  }

  async updateById(id, body) {
    const user = body;
    const anagraficaId = await this.salvaAnagrafica(req.body.anagrafica);
    delete req.body.anagrafica;
    user['anagrafica'] = anagraficaId;
    await Entity.findByIdAndUpdate(id, user);
  }

  async deleteById(id) {
    await Entity.findByIdAndRemove(id);
  }
}

module.exports = CategoriaProdottoService;
