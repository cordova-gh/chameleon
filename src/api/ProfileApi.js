const express = require('express');
const router = express.Router();
const ProfileService = require('../service/ProfileService');
const profileService = new ProfileService();

router.get('/', async (req, res) => {
  const ret =  await profileService.getAllPaginated(req);
  res.json({
    entities: ret.entities,
    currentPage: ret.page,
    pages: Math.ceil(ret.numOfEntities / ret.rowsPerPage),
    // searchVal: searchQuery,
    numOfResults: ret.numOfEntities,
  });
});

router.get('/:id', async (req, res) => {
  const entity = await profileService.getById(req.params.id);
  return res.json(entity);
});

router.post('/', async (req, res) => {
  const entity = await profileService.create(req.body);
  res.json({
    status: entity._id,
  });
});

router.put('/:id', async (req, res) => {
  await profileService.updateById(req.params.id, req.body);
  res.json({
    response: 'Modificato',
  });
});

router.delete('/:id', async (req, res) => {
  await profileService.deleteById(req.params.id);
  res.json({
    status: 'OK cancellato',
  });
});

module.exports = router;
