const express = require('express');
const router = express.Router();
const Entity = require('../models/Company');
const Anagrafica = require('../models/Anagrafica');

router.get('/', async (req, res) => {
    const resPerPage = 10; // results per page
    const page = req.query.page || 1;
    console.log('page ', page, req.query.page);
    //const entities = await Entity.find();
    const entities = await Entity.find().populate('anagrafica');

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
    const entity = await Entity.findById(req.params.id).populate('anagrafica');
    res.json(entity);
});

router.post('/', async (req, res) => {
    console.log('req', req.body);
    

    const companyBody                       = req.body;
    console.log('company',companyBody);
    companyBody.descrizione                 = companyBody.anagrafica.entitaGiuridica.descrAttivita;
    companyBody.anagrafica.codice           = companyBody.codice;
    companyBody.anagrafica.descrizione      = companyBody.anagrafica.entitaGiuridica.descrAttivita;
    companyBody.anagrafica.tipoAnagrafica   = 'PG';
    companyBody.anagrafica.stAnagrafica     = 'O';
    companyBody.anagrafica.titolo           = 'SRL';
    companyBody.anagrafica.isCompany        = true;
    const anagraficaId = await salvaAnagrafica(companyBody.anagrafica);

    const companyToInsert   =  new Entity({
        codice: companyBody.codice
        , descrizione: companyBody.descrizione
        , anagrafica: anagraficaId
    });

    await companyToInsert.save();

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


async function salvaAnagrafica(anagraficaBody) {
    const id = anagraficaBody._id;
    if (id) {
        await Anagrafica.findByIdAndUpdate(id, anagraficaBody);
        return id;
    } else {
        let anagrafica = new Anagrafica(anagraficaBody);
        await anagrafica.save(anagrafica);
        return anagrafica._id;
    }
}

module.exports = router;