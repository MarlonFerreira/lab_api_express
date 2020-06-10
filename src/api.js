const express = require('express')
const bodyParser = require('body-parser');
const helmet = require('helmet')
const swaggerDoc = require('./docs/swaggerDoc')
const variavelAmbiente = require('./helpers/variavelAmbienteHelper')

// ------- BANCO DE DADOS -------
const Postgres = require('./db/strategies/postgres/postgres')
const MongoDb = require('./db/strategies/mongodb/mongodb')

// // ------- ROTAS -------
const routes = require('./routes/declaracaoRoutes')

variavelAmbiente.config()

const app = express()
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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