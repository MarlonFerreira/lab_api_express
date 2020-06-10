const clienteSchema = require('./../../db/strategies/postgres/schemas/clienteSchema')
const DefineModelPostgresHelper = require('../../helpers/defineModelPostgresHelper')
const { compare } = require('bcrypt')
const jwt = require('jsonwebtoken')

var controller = {

    postOne: async function (req, res) {
        let _context = await DefineModelPostgresHelper.defineModelContext(clienteSchema)
        let result = await _context.read({ cliente_email: req.query.login, cliente_status: true })

        if (Object.keys(result).length === 0) {
            return res.status(422).send('Usuario ou senha invalidos')
        }
        let _cliente_id = result[0].cliente_id

        compare(req.query.senha, result[0].cliente_password, function (err, result) {
            if (err)
                throw err
            if (result == true) {
                var token = jwt.sign({ cliente_id: _cliente_id }, process.env.SECRET);
                return res.status(200).send({ auth: true, token: token })
            } else {
                return res.status(422).send('Usuario ou senha invalidos')

            }
        })
    }

}

module.exports = controller