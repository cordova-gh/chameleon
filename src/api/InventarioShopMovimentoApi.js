const express = require('express');
const router = express.Router();
const InventarioShopMovimentoService = require('../service/InventarioShopMovimentoService');
const inventarioShopMovimentoService = new InventarioShopMovimentoService();

router.get('/', async (req, res) => {
  const ret = await inventarioShopMovimentoService.getAllPaginated(req);
  res.json({
    entities: ret.entities,
    currentPage: ret.page,
    pages: Math.ceil(ret.numOfEntities / ret.rowsPerPage),
    // searchVal: searchQuery,
    numOfResults: ret.numOfEntities,
  });
});

router.get('/all', async (req, res) => {
  const entities = await inventarioShopMovimentoService.getAll(req);
  return res.json({
    entities: entities,
  });
});

router.get('/:id', async (req, res) => {
  const entity = await inventarioShopMovimentoService.getById(req.params.id);
  return res.json(entity);
});
router.get('/inventario-movimento/:inventarioMovimentoOrig', async (req, res) => {
  const entity = await inventarioShopMovimentoService.findByInventarioMovimentoOrig(req.params.inventarioMovimentoOrig);
  return res.json(entity);
});

router.post('/', async (req, res) => {
  const entity = await inventarioShopMovimentoService.create(req.body);
  res.json({
    response: entity._id,
  });
});

router.post('/save-carico', async (req, res) => {
  await inventarioShopMovimentoService.saveCarico(req.body);
  res.json({
    status: 'OK RICEVUTO',
  });
});

router.put('/:id', async (req, res) => {
  await inventarioShopMovimentoService.updateById(req.params.id, req.body);
  res.json({
    status: 'OK modificato',
  });
});

router.delete('/:id', async (req, res) => {
  await inventarioShopMovimentoService.deleteById(req.params.id);
  res.json({
    status: 'OK cancellato',
  });
});

module.exports = router;
