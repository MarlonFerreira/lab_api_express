const Postgres = require('../db/strategies/postgres/postgres')
const Context = require('../db/strategies/base/contextStrategy')

class DefineModelPostgresHelper{

    static async defineModelContext(schema) {
        let model = await Postgres.defineModel(connectionPostgres, schema)
        let context = new Context(new Postgres(connectionPostgres, model))
        return context
    }
}

module.exports = DefineModelPostgresHelper, this.context