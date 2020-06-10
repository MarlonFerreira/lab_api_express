const chai = require('chai')
const chaiHttp = require('chai-http')
const api = require('./../api')
const assert = require('assert')

chai.use(chaiHttp)
chai.should()

const MOCK_USUARIO_CADASTRAR_API = {
    cliente_nome: 'Bruna',
    cliente_endereco: 'Rua Alternativa',
    cliente_id_pais: 1,
    cliente_id_estado: 1,
    cliente_id_municipio: 4,
    cliente_telefone: 1475321201,
    cliente_email: Math.random()+'bruna@bruna.com',
    cliente_password: 'b123'
}

// ################## GET ##################

describe('Rota Cliente Express GET', function () {

    it('Deve retornar todos os clientes GET /cliente', (done) => {
        chai.request(api)
            .get('/cliente')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done()
            })
    })

    it('Deve retornar um cliente GET /cliente/?id', (done) => {
        let id = 59
        chai.request(api)
            .get('/cliente/' + id)
            .end((err, res) => {
                assert.deepEqual(res.body[0].cliente_id, id)
                done()
            })

    })
})

// ################## POST ##################

describe('Rota Cliente Express POST', function () {

    it('Deve criar um novo cliente POST /cliente', (done) => {
        chai.request(api)
            .post('/cliente')
            .send(MOCK_USUARIO_CADASTRAR_API)
            .end((err, res) => {
                res.should.have.status(200);
                done()
            })
    })
})

// ################## DELETE ##################

describe('Rota Cliente Express DELETE', function () {

    var MOCK_ID_CLIENTE_APAGAR = { cliente_email: "inicial@inicial.com" }

    it('Deve apagar um cliente pelo EMAIL DELETE /cliente', (done) => {
        chai.request(api)
            .delete('/cliente')
            .send(MOCK_ID_CLIENTE_APAGAR)
            .end((err, res) => {
                res.should.have.status(200);
                done()
            })
    })
})

// ################## PATCH ##################

describe('Rota Cliente Express PATCH', function () {

    var MOCK_DADOS_CLIENTE_ATUALIZAR = {
        cliente_id: 55,
        cliente_nome: 'Atualizado2133422',
        cliente_endereco: 'Rua Atualizado',
        cliente_id_pais: 1,
        cliente_id_estado: 1,
        cliente_id_municipio: 4,
        cliente_telefone: 1475321201,
        cliente_email: 'inicial@inicial.com',
        cliente_password: 'atualz'
    }

    it('Deve atualizar um cliente pelo ID PATCH /cliente', (done) => {
        chai.request(api)
            .patch('/cliente')
            .send(MOCK_DADOS_CLIENTE_ATUALIZAR)
            .end((err, res) => {
                res.should.have.status(200);
                done()
            })
    })
})


