const assert = require('assert')
const MongoDb = require('../../db/strategies/mongodb/mongodb')
const Context = require('../../db/strategies/base/contextStrategy')
const ProdutoSchema = require('../../db/strategies/mongodb/schemas/produtoSchema')
const variavelAmbiente = require('../../helpers/variavelAmbienteHelper')

const MOCK_PRODUTO_DEFAULT =  {
    nome: 'Jaqueta',
    detalhes: 'Preta'
}

const MOCK_PRODUTO_CADASTRAR =  {
    nome: 'Camisa',
    detalhes: 'Azul'
}


let context = {}
let connection = {}

describe('MongoDB Suite de testes', function () {
    this.beforeAll(async () => {
        variavelAmbiente.config()
        connection = MongoDb.connect()
        context = new Context(new MongoDb(connection, ProdutoSchema))
        
        await context.create(MOCK_PRODUTO_DEFAULT)
        })
   
    it('Verificar conexao', async () => {
        const result = await MongoDb.isConnected(connection)
        const expected = 'Conectado'

        assert.deepEqual(result, expected)
    })

    it('Cadastrar', async () => {
        const { detalhes, nome } = await context.create(MOCK_PRODUTO_CADASTRAR)
        assert.deepEqual({ nome, detalhes}, MOCK_PRODUTO_CADASTRAR)
    })

})

