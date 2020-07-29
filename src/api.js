const express = require('express')
const bodyParser = require('body-parser');
const variavelAmbiente = require('./helpers/variavelAmbienteHelper')
var compression = require('compression')
require('./helpers/promiseRejection')
//const acl = require('./helpers/acl/aclHelper')

var cors = require('cors')
require('./helpers/cors/corsHelper')

// ------- SEGURANCA -------
const helmet = require('helmet')

// ------- LOG -------
const morgan = require('morgan'), accessLogStream = require('./helpers/log/logHelper')

// ------- BANCO DE DADOS -------
const Postgres = require('./db/strategies/postgres/postgres'), MongoDb = require('./db/strategies/mongodb/mongodb'), MySql = require('./db/strategies/mysql/mysql')

// // ------- ROTAS -------
const routes = require('./routes/declaracaoRoutes'), swaggerDoc = require('./docs/swaggerDoc')

variavelAmbiente.config()
const app = express()
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('combined', { stream: accessLogStream }));
app.use(compression());
app.use(cors(this.corsOptions));

//app.use(acl.authorize);  

(async function main() {
    connectionPostgres = await Postgres.connect()
    connectionMongoDB = MongoDb.connect()
    connectionMySql = MySql.connect()
 
    app.use('/', routes)
    swaggerDoc(app)

    const server = app.listen(process.env.PORT, function () {
        console.log('Servidor rodando na porta ' + server.address().port);
    })
})()
