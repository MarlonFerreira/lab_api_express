const DefineModelPostgresHelper = require('../../helpers/defineModelPostgresHelper')
const clienteSchema = require('../../db/strategies/postgres/schemas/clienteSchema')
const { hash } = require('bcrypt');
const salt = 10

var controller = {

    postOne: async function (req, res) {
        let _context = await DefineModelPostgresHelper.defineModelContext(clienteSchema)

        hash(req.body.cliente_password, salt, async function (err, hash) {
            if(err){
                res.json({ message: "Nao foi possivel criar um novo cliente" })
                throw err
            }

            await _context.create({ cliente_nome: req.body.cliente_nome, cliente_email: req.body.cliente_email, cliente_password: hash })
            return res.json({ message: "Cliente salvo com sucesso" })
        })
    }
}

module.exports = controller