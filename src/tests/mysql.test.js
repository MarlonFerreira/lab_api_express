const assert = require('assert')
const MySql = require('../db/strategies/mysql/mysql')
const Context = require('../db/strategies/base/contextStrategy')
const ProdutosSchema = require('../db/strategies/mysql/schemas/produtoSchema')

describe('MySql - Clientes', function () {
    this.beforeAll(async function () {
        const connection = await MySql.connect()
        const model = await MySql.defineModel(connection, ProdutosSchema)
        context = new Context(new MySql(connection, model))

    })

    it('Verifica conexao com o MySql', async function() {
        const result = await context.isConnected()
        assert.equal(result, true)
    })

})