const express = require('express');
const router = express.Router();
const Entity = require('../models/Articolo');

router.get('/', async (req, res) => {
    const resPerPage = 10; // results per page
    const page = req.query.page || 1;
    //const entities = await Entity.find();
    let query = Entity.find();
    Object.keys(req.query).forEach((key) => {
      if (key !== 'page') query.where(key, req.query[key]);
    });

    const entities = await query
    .skip(resPerPage * page - resPerPage)
    .limit(resPerPage)
    .sort('codice')
    .exec();

    const numOfEntities = await Entity.countDocuments();
    res.json({
        entities: entities,
        currentPage: page,
        pages: Math.ceil(numOfEntities / resPerPage),
        // searchVal: searchQuery, 
        numOfResults: numOfEntities
    });
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