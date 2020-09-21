const express = require('express');
const router = express.Router();
const AnagraficaService = require('../service/AnagraficaService');
const anagraficaService = new AnagraficaService();

router.get('/', async (req, res) => {
  const ret = await anagraficaService.getAllPaginated(req);
  res.json({
    entities: ret.entities,
    currentPage: ret.page,
    pages: Math.ceil(ret.numOfEntities / ret.rowsPerPage),
    // searchVal: searchQuery,
    numOfResults: ret.numOfEntities,
  });
});

router.get('/:id', async (req, res) => {
  const entity = await anagraficaService.getById(req.params.id);
  return res.json(entity);
});

router.post('/', async (req, res) => {
  const entity = await anagraficaService.create(req.body);
  res.json({
    response: entity._id,
  });
});

router.put('/:id', async (req, res) => {
  await anagraficaService.updateById(req.params.id);
  res.json({
    status: 'OK modificato',
  });
});

router.delete('/:id', async (req, res) => {
  await anagraficaService.deleteById(req.params.id);
  res.json({
    status: 'OK cancellato',
  });
});

module.exports = router;
