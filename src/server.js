
const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const cookieSession = require('cookie-session');
const cors = require('cors');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
require('./passport/local-auth');
require('./passport/google-auth');
require('./database');
//settings
app.set('port', process.env.PORT || 5000);
//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
  }))
app.use(cors());
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Customer API",
      description: "Customer API Information",
      contact: {
        name: "Amazing Developer"
      },
      servers: ["http://localhost:5000"]
    }
  },
  //['.api/*.js']
  apis: ['server.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);


app.use(passport.initialize());
app.use(passport.session());
// Routes 
app.use('/api/users', require('./api/UserApi'));
app.use('/api/dominios', require('./api/DominioApi'));
app.use('/api/companies', require('./api/CompanyApi'));
app.use('/api/profiles', require('./api/ProfileApi'));
app.use('/api/files', require('./api/FileApi'));
app.use('/api/categoria-prodottos', require('./api/CategoriaProdottoApi'));
app.use('/api/shops', require('./api/ShopApi'));
app.use('/api/anagraficas', require('./api/AnagraficaApi'));
app.use('/api/anagrafica-fornitore-clientes', require('./api/AnagraficaFornitoreClienteApi'));
app.use('/api/countries', require('./api/CountryApi'));
app.use('/api/prodottos', require('./api/ProdottoApi'));
app.use('/api/unita-misuras', require('./api/UnitaMisuraApi'));
app.use('/api/marcas', require('./api/MarcaApi'));
app.use('/api/inventario-movimentos', require('./api/InventarioMovimentoApi'));
//app.use('/api/auth/google', require('./api/GoogleApi'));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
//static files

app.listen(app.get('port'), () => {
    console.log('Server avviato in porta ', app.get('port'))
})