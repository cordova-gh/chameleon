
const mongoose = require('mongoose');
//const uri = "mongodb+srv://admin:trYPLEebdgTixddC@mmarket-db-98071.mongodb.net/demo?retryWrites=true&w=majority";
const uri = "mongodb://127.0.0.1:27017/demo?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('Connessione a MongoDB riuscita'))
    .catch(err => console.error('non sono riuscito a connettermi', err));
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);