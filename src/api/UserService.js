const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');
const Anagrafica = require('../models/Anagrafica');


router.get('/', async (req, res) => {
    const resPerPage = 10; // results per page
    const page = req.query.page || 1;
    console.log('page ', page, req.query.page);
    //const entities = await User.find();
    const entities = await User.find()
        .populate('anagrafica')
        .populate('profile')
        .populate('azienda')
        .populate('stUtenza')
        .skip((resPerPage * page) - resPerPage)
        .limit(resPerPage);

    const numOfEntities = await User.countDocuments();
    res.json({
        entities: entities,
        currentPage: page,
        pages: Math.ceil(numOfEntities / resPerPage),
        // searchVal: searchQuery, 
        numOfResults: numOfEntities
    });
});

router.get('/:id', async (req, res) => {
    const entity = await User.findById(req.params.id).populate('anagrafica');
    res.json(entity);
});

router.post('/', async (req, res) => {
    const anagraficaId = await salvaAnagrafica(req.body.anagrafica);
    const entity = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        anagrafica: anagraficaId
    });
    await entity.save();

    res.json({
        status: 'OK RICEVUTO'
    })
});

router.put('/:id', async (req, res) => {
    const user = req.body;
    const anagraficaId = await salvaAnagrafica(req.body.anagrafica);
    delete req.body.anagrafica;
    user['anagrafica'] = anagraficaId;
    await User.findByIdAndUpdate(req.params.id, user);
    res.json({
        status: 'OK modificato'
    })
});

router.delete('/:id', async (req, res) => {
    await User.findByIdAndRemove(req.params.id);
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
        anagrafica.isUser = true;
        anagrafica.tipoAnagrafica = 'PF';
        await anagrafica.save(anagrafica);
        return anagrafica._id;
    }


}

module.exports = router;