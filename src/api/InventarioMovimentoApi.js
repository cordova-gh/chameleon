const express = require('express');
const router = express.Router();
const InventarioMovimentoService = require('../service/InventarioMovimentoService');
const inventarioMovimentoService = new InventarioMovimentoService();

router.get('/', async (req, res) => {
  const ret = await inventarioMovimentoService.getAllPaginated(req);
  res.json({
    entities: ret.entities,
    currentPage: ret.page,
    pages: Math.ceil(ret.numOfEntities / ret.rowsPerPage),
    // searchVal: searchQuery,
    numOfResults: ret.numOfEntities,
  });
});

router.get('/all', async (req, res) => {
  const entities = await inventarioMovimentoService.getAll(req);
  return res.json({
    entities: entities,
  });
});

router.get('/:id', async (req, res) => {
  const entity = await inventarioMovimentoService.getById(req.params.id);
  return res.json(entity);
});

router.post('/', async (req, res) => {
  const entity = await inventarioMovimentoService.create(req.body);
  res.json({
    response: entity._id,
  });
});

router.post('/save-carico', async (req, res) => {
  await inventarioMovimentoService.saveCarico(req.body);
  res.json({
    status: 'OK RICEVUTO',
  });
});

router.put('/:id', async (req, res) => {
  await inventarioMovimentoService.updateById(req.params.id);
  res.json({
    status: 'OK modificato',
  });
});

router.delete('/:id', async (req, res) => {
  await inventarioMovimentoService.deleteById(req.params.id);
  res.json({
    status: 'OK cancellato',
  });
});

module.exports = router;
