const express = require('express');
const router = express.Router();
const ShopService = require('../service/ShopService');
const shopService = new ShopService();

router.get('/', async (req, res) => {
  const ret = await shopService.getAllPaginated(req);
  res.json({
    entities: ret.entities,
    currentPage: ret.page,
    pages: Math.ceil(ret.numOfEntities / ret.rowsPerPage),
    // searchVal: searchQuery,
    numOfResults: ret.numOfEntities,
  });
});

router.get('/:id', async (req, res) => {
  const entity = await shopService.getById(req.params.id);
  return res.json(entity);
});

router.post('/', async (req, res) => {
  const entity = await shopService.create(req.body);
  res.json({
    response: entity._id,
  });
});

router.put('/:id', async (req, res) => {
  await shopService.updateById(req.params.id, req.body);
  res.json({
    status: 'OK modificato',
  });
});

router.delete('/:id', async (req, res) => {
  await shopService.deleteById(req.params.id);
  res.json({
    status: 'OK cancellato',
  });
});

module.exports = router;
