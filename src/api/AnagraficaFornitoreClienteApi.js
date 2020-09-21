const express = require('express');
const router = express.Router();
const AnagraficaFornitoreClienteService = require('../service/AnagraficaFornitoreClienteService');
const anagraficaFornitoreClienteService = new AnagraficaFornitoreClienteService();

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

router.get('/all', async (req, res) => {
  const entities = await anagraficaFornitoreClienteService.getAll(req);
  return res.json({
    entities: entities,
  });
});

router.get('/:id', async (req, res) => {
  const entity = await anagraficaFornitoreClienteService.getById(req.params.id);
  return res.json(entity);
});

router.post('/', async (req, res) => {
  const entity = await anagraficaFornitoreClienteService.create(req.body);
  res.json({
    response: entity._id,
  });
});

router.put('/:id', async (req, res) => {
  await anagraficaFornitoreClienteService.updateById(req.params.id);
  res.json({
    status: 'OK modificato',
  });
});

router.delete('/:id', async (req, res) => {
  await anagraficaFornitoreClienteService.deleteById(req.params.id);
  res.json({
    status: 'OK cancellato',
  });
});



module.exports = router;
