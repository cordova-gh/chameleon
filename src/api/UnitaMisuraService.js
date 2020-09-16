const express = require('express');
const router = express.Router();
const Entity = require('../models/UnitaMisura');
const Service = require('./Service');
const service = new Service();

router.get('/', async (req, res) => {
    const resPerPage = 10; // results per page
    const page = req.query.page || 1;
    console.log('page ', page, req.query.page);
    //const entities = await Entity.find();
    const entities = await Entity.find();

    const numOfEntities = await Entity.countDocuments();
    res.json({
        entities: entities,
        currentPage: page,
        pages: Math.ceil(numOfEntities / resPerPage),
        // searchVal: searchQuery, 
        numOfResults: numOfEntities
    });
});

router.get('/all', async (req, res) => {
    return service.getAll(Entity, req, res, 'codice descrizione', 'codice');
  });
  


router.get('/:id', async (req, res) => {
    const entity = await Entity.findById(req.params.id);
    res.json(entity);
});


router.post('/', async (req, res) => {
    const entity = new Entity(req.body);
    await entity.save();
    res.json({
        status: 'OK RICEVUTO'
    })
});

router.put('/:id', async (req, res) => {
    await Entity.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'OK modificato'
    })
});

router.delete('/:id', async (req, res) => {
    await Entity.findByIdAndRemove(req.params.id);
    res.json({
        status: 'OK cancellato'
    })
});

module.exports = router;