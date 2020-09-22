const express = require('express');
const router = express.Router();
const CategoriaProdottoService  = require('../service/CategoriaProdottoService')
const categoriaProdottoService = new CategoriaProdottoService();

router.get('/', async (req, res) => {
  const ret = await anagraficaFornitoreClienteService.getAllPaginated(req);
  res.json({
    entities: ret.entities,
    currentPage: ret.page,
    pages: Math.ceil(ret.numOfEntities / ret.rowsPerPage),
    // searchVal: searchQuery,
    numOfResults: ret.numOfEntities,
  });
});

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



router.get('/:id', async (req, res) => {
    const entity = await categoriaProdottoService.getById(req.params.id);
    return res.json(entity);
});

router.post('/', async (req, res) => {
    const entity = await categoriaProdottoService.create(req.body);
    res.json({
      response: entity._id,
    });
});

router.put('/:id', async (req, res) => {
    await categoriaProdottoService.updateById(req.params.id, req.body);
    res.json({
      status: 'OK modificato',
    });
});

router.delete('/:id', async (req, res) => {
    await categoriaProdottoService.deleteById(req.params.id);
    res.json({
      status: 'OK cancellato',
    });
});

module.exports = router;