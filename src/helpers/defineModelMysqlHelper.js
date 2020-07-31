const Mysql = require('../db/strategies/mysql/mysql')
const Context = require('../db/strategies/base/contextStrategy')

class DefineModelMysqlHelper{

    static async defineModelContext(schema) {
        let model = await Mysql.defineModel(connectionMySql, schema)
        let context = new Context(new Mysql(connectionMySql, model))
        return context
    }
}

module.exports = DefineModelMysqlHelper, this.context