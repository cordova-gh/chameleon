const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Entity = require('../models/User');
const Anagrafica = require('../models/Anagrafica');
const Service = require('./Service');
const service = new Service();

router.get('/', async (req, res) => {
  const resPerPage = 10; // results per page
  const page = req.query.page || 1;
  const entities = await Entity.find()
    .populate('anagrafica profile azienda stUtenza')
    .skip(resPerPage * page - resPerPage)
    .limit(resPerPage);

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
  return service.getAll(Entity, req, res, 'codice descrizione', 'descrizione');
});

router.get('/:id', async (req, res) => {
  return service.getById(Entity, req.params.id, res, 'anagrafica');
});

router.post('/', async (req, res) => {
  const anagraficaId = await salvaAnagrafica(req.body.anagrafica);
  const entity = new Entity({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    anagrafica: anagraficaId,
    profile: req.body.profile,
    azienda: req.body.azienda,
    stUtenza: req.body.stUtenza,
  });
  await entity.save();

  res.json({
    status: 'OK RICEVUTO',
  });
});

router.put('/:id', async (req, res) => {
  const user = req.body;
  const anagraficaId = await salvaAnagrafica(req.body.anagrafica);
  delete req.body.anagrafica;
  user['anagrafica'] = anagraficaId;
  await Entity.findByIdAndUpdate(req.params.id, user);
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

async function salvaAnagrafica(anagraficaBody) {
  const id = anagraficaBody._id;
  if (id) {
    await Anagrafica.findByIdAndUpdate(id, anagraficaBody);
    return id;
  } else {
    let anagrafica = new Anagrafica(anagraficaBody);
    anagrafica.isUser = true;
    anagrafica.tipoAnagrafica = 'PF';
    await anagrafica.save(anagrafica);
    return anagrafica._id;
  }
}

module.exports = router;
