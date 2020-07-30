const assert = require('assert')
const Postgres = require('../../db/strategies/postgres/postgres')
const Context = require('../../db/strategies/base/contextStrategy')
const ClientesSchema = require('../../db/strategies/postgres/schemas/clienteSchema')
const variavelAmbiente = require('../../helpers/variavelAmbienteHelper')

const MOCK_USUARIO_INICIAL = {
    cliente_nome: 'Inicial',
    cliente_id_pais: 1,
    cliente_id_estado: 1,
    cliente_id_municipio: 4,
    cliente_endereco: 'Rua Inicial Inicial',
    cliente_telefone: 14954788569,
    cliente_email: Math.random()+'inicial@inicial.com',
    cliente_password: 'inicial'
}

const MOCK_USUARIO_ALTERAR = {
    cliente_nome: 'ALTERAR',
    cliente_id_pais: 1,
    cliente_id_estado: 1,
    cliente_id_municipio: 4,
    cliente_endereco: 'Rua ALTERAR ALTERAR',
    cliente_telefone: 14954788569,
    cliente_email: 'ALTERAR@ALTERAR.com',
    cliente_password: 'ALTERAR'
}


const MOCK_USUARIO_CADASTRAR = {
    cliente_nome: 'Lucas',
    cliente_id_pais: 1,
    cliente_id_estado: 1,
    cliente_id_municipio: 4,
    cliente_endereco: 'Rua Eno Pomp',
    cliente_telefone: 14954788569,
    cliente_email: Math.random()+'lucas@lucas.com',
    cliente_password: 'Lu'
}

const MOCK_USUARIO_CONSULTAR = {
    cliente_id: '56',
    cliente_nome: 'Lucas',
    cliente_id_pais: 1,
    cliente_id_estado: 1,
    cliente_id_municipio: 4,
    cliente_endereco: 'Rua Eno Pomp',
    cliente_telefone: '14954788569',
    cliente_email: '0.4486197758594379lucas@lucas.com',
    cliente_password: 'Lu'
}

const MOCK_USUARIO_DELETAR = {
    cliente_nome: 'Deletar',
    cliente_endereco: 'Deletar',
    cliente_id_pais: 1,
    cliente_id_estado: 1,
    cliente_id_municipio: 4,
    cliente_telefone: 14954788569,
    cliente_email: 'Deletar@deletar.com',
    cliente_password: 'DELETAR'
}

let connection = {}

describe('Postgres - Clientes', function () {
    this.beforeAll(async function () {
        variavelAmbiente.config()
        connection = await Postgres.connect()
        const model = await Postgres.defineModel(connection, ClientesSchema)
        context = new Context(new Postgres(connection, model))
    })

    it('Verifica conexao com o Postgres', async function() {
        const result = await Postgres.isConnected(connection)
        assert.equal(result, true)
    })

    it('Salva usuario no Postgres', async function(){
        const result = await context.create(MOCK_USUARIO_CADASTRAR)
        assert.equal;(result, 1)
    })

    it('Lista clientes do Postgres', async function(){
        const [result] = await context.read({ cliente_id: 56 })
        delete result.cliente_status
        assert.deepEqual (result, MOCK_USUARIO_CONSULTAR )
    })

    it('Atualiza cliente do Postgres', async function(){
        await context.create(MOCK_USUARIO_ALTERAR)
        const [itemAtualizar] = await context.read({ cliente_email: MOCK_USUARIO_ALTERAR.cliente_email })
        const novoItem = {
            ...itemAtualizar,
            cliente_nome: 'Alterado',
            cliente_endereco: 'Rua Alterado',
            cliente_email: Math.random()+'atualiza@atualiza.com'
        }
        const [result] = await context.update({ cliente_email: itemAtualizar.cliente_email } , novoItem)
        assert.deepEqual(result, 1)
    })

    it('Deleta cliente do Postgres', async function(){
        await context.create(MOCK_USUARIO_DELETAR)
        const [itemDeletar] = await context.read({ cliente_email: MOCK_USUARIO_DELETAR.cliente_email })
        const result = await context.delete({ cliente_email: itemDeletar.cliente_email })

        assert.deepEqual(result, 1)
    })

    it('Nao pode deletar TUDO do clientes do Postgres', async function(){
        const result = await context.delete({  })
        assert.deepEqual(result, 0)
    })

    it.skip('Fecha conexao ao Postgres', async function(){
        const result = await context.closeConnection()
        assert.deepEqual(result, true)
    })

    it.skip('Verifica desconexao com o Postgres - Pos disconnect', async function() {
        const result = await context.isConnected()
        assert.equal(result, false)
    })


})