const express = require('express');
const router = express.Router();
const CountryService = require('../service/CountryService');
const countryService = new CountryService();

router.get('/', async (req, res) => {
  const ret = await countryService.getAllPaginated(req);
  res.json({
    entities: ret.entities,
    currentPage: ret.page,
    pages: Math.ceil(ret.numOfEntities / ret.rowsPerPage),
    // searchVal: searchQuery,
    numOfResults: ret.numOfEntities,
  });
});

router.get('/all', async (req, res) => {
  const entities = await countryService.getAll(req);
  return res.json({
    entities: entities,
  });
});

router.get('/:id', async (req, res) => {
  const entity = await countryService.getById(req.params.id);
  return res.json(entity);
});

router.post('/', async (req, res) => {
  const entity = await countryService.create(req.body);
  res.json({
    response: entity._id,
  });
});

router.put('/:id', async (req, res) => {
  await countryService.updateById(req.params.id, req.body);
  res.json({
    status: 'OK modificato',
  });
});

router.delete('/:id', async (req, res) => {
  await countryService.deleteById(req.params.id);
  res.json({
    status: 'OK cancellato',
  });
});

module.exports = router;
