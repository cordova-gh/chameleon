
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
app.use('/api/tasks', require('./api/TaskService'));
app.use('/api/users', require('./api/UserService'));
app.use('/api/dominios', require('./api/DominioService'));
app.use('/api/companies', require('./api/CompanyService'));
app.use('/api/profiles', require('./api/ProfileService'));
app.use('/api/files', require('./api/FileService'));
app.use('/api/categoria-prodottos', require('./api/CategoriaProdottoService'));
app.use('/api/shops', require('./api/ShopService'));
app.use('/api/anagraficas', require('./api/AnagraficaService'));
app.use('/api/anagrafica-fornitore-clientes', require('./api/AnagraficaFornitoreClienteService'));
app.use('/api/countries', require('./api/CountryService'));
app.use('/api/prodottos', require('./api/ProdottoService'));
app.use('/api/unita-misuras', require('./api/UnitaMisuraService'));
app.use('/api/marcas', require('./api/MarcaService'));
//app.use('/api/auth/google', require('./api/GoogleService'));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
//static files

app.listen(app.get('port'), () => {
    console.log('Server avviato in porta ', app.get('port'))
})