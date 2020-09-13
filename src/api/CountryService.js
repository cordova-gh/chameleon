const { query } = require('express');
const express = require('express');
const router = express.Router();
const Entity = require('../models/Country');
const Service = require('./Service');
const service = new Service();

router.get('/', async (req, res) => {
  const resPerPage = 10; // results per page
  const page = req.query.page || 1;
  let queryObject = Entity.find();
  queryObject = service.paramsQuery(queryObject, req.query);

  const entities = await queryObject
    .skip(resPerPage * page - resPerPage)
    .limit(resPerPage)
    .sort('codIsoStato')
    .exec();

  const numOfEntities = await Entity.countDocuments();
  res.json({
    entities: entities,
    currentPage: page,
    pages: Math.ceil(numOfEntities / resPerPage),
    // searchVal: searchQuery,
    numOfResults: numOfEntities,
  });
});

router.get('/all', async (req, res) => {
  return service.getAll(Entity, req, res, 'codIsoStato descrizione', 'descrizione');
});

router.get('/:id', async (req, res) => {
  return service.getById(Entity, req.params.id, res);
});

router.post('/', async (req, res) => {
  const entity = new Entity(req.body);
  await entity.save();
  res.json({
    status: 'OK RICEVUTO',
  });
});

router.put('/:id', async (req, res) => {
  await Entity.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    status: 'OK modificato',
  });
});

router.delete('/:id', async (req, res) => {
  await Entity.findByIdAndRemove(req.params.id);
  res.json({
    status: 'OK cancellato',
  });
});

module.exports = router;
