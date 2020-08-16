const express = require('express');
const router = express.Router();
const Entity = require('../models/CategoriaProdotto');
const SottoCategoriaProdotto = require('../models/SottoCategoriaProdotto');
const mongoose = require('mongoose');

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




router.get('/sotto-categoria-prodottos/:idCategoria', async (req, res) => {
    const resPerPage = 10; // results per page
    const page = req.query.page || 1;
    let numOfEntities = 0;
    Entity.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(req.params.idCategoria) } },
        {
            $project: {
                "numElements": { $size: "$sottoCategorias" }
            }
        }
    ]).exec(function (err, ret) {
        numOfEntities = ret[0].numElements;
    });


    Entity.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(req.params.idCategoria) } },
        {
            $project: {
                sottoCategorias: {
                    $slice: ["$sottoCategorias"
                        , (resPerPage * page) - resPerPage, resPerPage]
                }
            }
        }, {
            $unwind: "$sottoCategorias"
        }, {
            $sort: {
                "sottoCategorias.codice": 1
            }
        },
        {
            $project: {
                "sottoCategoria": "$sottoCategorias",

            }
        }]).exec(function (err, sottoCategorias) {
            // console.log('numero entities',numOfEntities);
            res.json({
                entities: sottoCategorias,
                currentPage: page,
                pages: Math.ceil(numOfEntities / resPerPage),
                // searchVal: searchQuery, 
                numOfResults: numOfEntities
            });
        });


});

router.get('/sotto-categoria-prodottos/:idCategoria/:id', async (req, res) => {

    Entity.aggregate(
        { $match: { _id: mongoose.Types.ObjectId(req.params.idCategoria) } },
        { $unwind: '$sottoCategorias' },
        { $match: { 'sottoCategorias._id': req.params.idCategoria } })
});

router.post('/sotto-categoria-prodottos/:idCategoria', async (req, res) => {
    const entity = await Entity.findById(req.params.idCategoria);
    entity.sottoCategorias.push(new SottoCategoriaProdotto({ codice: req.body.codice, descrizione: req.body.descrizione }));
    await entity.save();
    res.json({
        status: 'OK RICEVUTO'
    })
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