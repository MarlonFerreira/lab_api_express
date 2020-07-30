const assert = require('assert')
const MySql = require('../../db/strategies/mysql/mysql')
const Context = require('../../db/strategies/base/contextStrategy')
const ProdutosSchema = require('../../db/strategies/mysql/schemas/produtoSchema')
const variavelAmbiente = require('../../helpers/variavelAmbienteHelper')

let connection = {}

describe('MySql - Clientes', function () {
    this.beforeAll(async function () {
        variavelAmbiente.config()
        connection = await MySql.connect()
        const model = await MySql.defineModel(connection, ProdutosSchema)
        context = new Context(new MySql(connection, model))

    })

    it('Verifica conexao com o MySql', async function() {
        const result = await MySql.isConnected(connection)
        assert.equal(result, true)
    })

})