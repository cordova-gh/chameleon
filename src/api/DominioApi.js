const express = require('express');
const router = express.Router();
const DominioService = require('../service/DominioService');
const dominioService = new DominioService();

router.get('/', async (req, res) => {
  const ret = await dominioService.getAllPaginated(req);
  res.json({
    entities: ret.entities,
    currentPage: ret.page,
    pages: Math.ceil(ret.numOfEntities / ret.rowsPerPage),
    // searchVal: searchQuery,
    numOfResults: ret.numOfEntities,
  });
});

router.get('/includes', async (req, res) => {
  const entities = await dominioService.includes(req);
  res.json(entities);
});

router.get('/:dominio', async (req, res) => {
  const entities = await dominioService.getByDominio(req);
  res.json(entities);
});

router.get('/:dominio/:descrizione', async (req, res) => {
  const entities = await dominioService.getByDominioAndDescrizione(req);
  res.json(entities);
});

router.get('/:id', async (req, res) => {
  const entity = await dominioService.getById(req.params.id);
  return res.json(entity);
});

router.post('/', async (req, res) => {
  const entity = await dominioService.create(req.body);
  res.json({
    response: entity._id,
  });
});

router.put('/:id', async (req, res) => {
  await dominioService.updateById(req.params.id, req.body);
  res.json({
    status: 'OK modificato',
  });
});

router.delete('/:id', async (req, res) => {
  await dominioService.deleteById(req.params.id);
  res.json({
    status: 'OK cancellato',
  });
});

module.exports = router;
