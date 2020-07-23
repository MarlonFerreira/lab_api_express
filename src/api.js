const express = require('express')
const bodyParser = require('body-parser');
const variavelAmbiente = require('./helpers/variavelAmbienteHelper')
var compression = require('compression')
require('./helpers/promiseRejection')
//const acl = require('./helpers/acl/aclHelper')

// ------- SEGURANCA -------
const helmet = require('helmet')

// ------- LOG -------
const morgan = require('morgan')
const accessLogStream = require('./helpers/log/logHelper')

// ------- BANCO DE DADOS -------
const Postgres = require('./db/strategies/postgres/postgres')
const MongoDb = require('./db/strategies/mongodb/mongodb')

// // ------- ROTAS -------
const routes = require('./routes/declaracaoRoutes')
const swaggerDoc = require('./docs/swaggerDoc')

variavelAmbiente.config()                                       //Configurando ambiente dev ou prod
const app = express()                                           //Instanciando express
app.use(helmet());                                              //Instanciando seguranca helmet
app.use(bodyParser.urlencoded({ extended: false }));            //Mantendo apenas no bodyParser o urlencoded
app.use(bodyParser.json());                                     //Tranformando bodyParser em JSON
app.use(morgan('combined', { stream: accessLogStream }));       //Usando express junto com morgan(log)
app.use(compression());
//app.use(acl.authorize);  

(async function main() {
    connectionPostgres = await Postgres.connect()
    connectionMongoDB = MongoDb.connect()
 
    app.use('/', routes)
    swaggerDoc(app)

    var server = app.listen(process.env.PORT, function () {
        console.log('Servidor rodando na porta ' + server.address().port);
    })
})()
module.exports = app
