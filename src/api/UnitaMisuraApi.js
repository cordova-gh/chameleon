const express = require('express');
const router = express.Router();
const UnitaMisuraService = require('../service/UnitaMisuraService');
const unitaMisuraService = new UnitaMisuraService();

router.get('/', async (req, res) => {
  const ret = await unitaMisuraService.getAllPaginated(req);
  res.json({
    entities: ret.entities,
    currentPage: ret.page,
    pages: Math.ceil(ret.numOfEntities / ret.rowsPerPage),
    // searchVal: searchQuery,
    numOfResults: ret.numOfEntities,
  });
});

router.get('/all', async (req, res) => {
  const entities = await unitaMisuraService.getAll(req);
  return res.json({
    entities: entities,
  });
});

router.get('/:id', async (req, res) => {
  const entity = await unitaMisuraService.getById(req.params.id);
  return res.json(entity);
});

router.post('/', async (req, res) => {
  const entity = await unitaMisuraService.create(req.body);
  console.log(entity);
  res.json({
    response: entity._id,
  });
});

router.put('/:id', async (req, res) => {
  await unitaMisuraService.updateById(req.params.id, req.body);
  res.json({
    status: 'OK modificato',
  });
});

router.delete('/:id', async (req, res) => {
  await unitaMisuraService.deleteById(req.params.id);
  res.json({
    status: 'OK cancellato',
  });
});

module.exports = router;
