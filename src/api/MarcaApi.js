const express = require('express');
const router = express.Router();
const MarcaService = require('../service/MarcaService');
const marcaService = new MarcaService();

router.get('/', async (req, res) => {
  const ret = await marcaService.getAllPaginated(req);
  res.json({
    entities: ret.entities,
    currentPage: ret.page,
    pages: Math.ceil(ret.numOfEntities / ret.rowsPerPage),
    // searchVal: searchQuery,
    numOfResults: ret.numOfEntities,
  });
});

router.get('/all', async (req, res) => {
  const entities = await marcaService.getAll(req);
  return res.json({
    entities: entities,
  });
});

router.get('/:id', async (req, res) => {
  const entity = await marcaService.getById(req.params.id);
  return res.json(entity);
});

router.post('/', async (req, res) => {
  const entity = await marcaService.create(req.body);
  res.json({
    response: entity._id,
  });
});

router.put('/:id', async (req, res) => {
  await marcaService.updateById(req.params.id);
  res.json({
    status: 'OK modificato',
  });
});

router.delete('/:id', async (req, res) => {
  await marcaService.deleteById(req.params.id);
  res.json({
    status: 'OK cancellato',
  });
});

module.exports = router;
