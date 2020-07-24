'use strict'

const { check, validationResult } = require('express-validator');
const router = require('express').Router();
const controller = require('./controller')

router.post('/login', [
    check('login').isEmail(),
    check('senha').exists()
], async function (req, res) {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        controller.postOne(req, res)

    } catch (error) {
        console.log(error)
        return res.status(422).send('Usuario ou senha invalidos')
    }
})

router.all('/login', async function (req, res) {

        return res.status(204).send('Sem acesso')
})

module.exports = router
