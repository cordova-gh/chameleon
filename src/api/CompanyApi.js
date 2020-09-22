const express = require('express');
const router = express.Router();
const CompanyService  = require('../service/CompanyService')
const companyService = new CompanyService();

router.get('/', async (req, res) => {
  const ret = await companyService.getAllPaginated(req);
  res.json({
    entities: ret.entities,
    currentPage: ret.page,
    pages: Math.ceil(ret.numOfEntities / ret.rowsPerPage),
    // searchVal: searchQuery,
    numOfResults: ret.numOfEntities,
  });
});

router.get('/:id', async (req, res) => {
  const entity = await companyService.getById(req.params.id);
  return res.json(entity);
});

router.post('/', async (req, res) => {
  const entity = await companyService.create(req.body);
  res.json({
    response: entity._id,
  });
});

router.put('/:id', async (req, res) => {
  await companyService.updateById(req.params.id, req.body);
  res.json({
    status: 'OK modificato',
  });
});

router.delete('/:id', async (req, res) => {
  await companyService.deleteById(req.params.id);
  res.json({
    status: 'OK cancellato',
  });
});

module.exports = router;
