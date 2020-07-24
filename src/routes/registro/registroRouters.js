const router = require('express').Router()
const controller = require('./controller')
const { check, validationResult } = require('express-validator');

router.post('/registro', [
    check('cliente_nome').isLength(3, 100),
    check('cliente_email').isEmail(),
    check('cliente_password').exists()
], async function (req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        await controller.postOne(req, res)
    } catch (error) {
        return res.send('Nao foi possivel criar um novo cliente')
    }
})

router.all('/registro', async function (req, res) {

    return res.status(204).send('Sem acesso')
})

module.exports = router
