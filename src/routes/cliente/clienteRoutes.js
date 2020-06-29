'use strict'

const controller = require('./controller')
const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

// ################## VERIFICA TOKEN ##################
function verifyToken(token) {
    var decoded = jwt.verify(token, process.env.SECRET)
    return decoded
}


// ################## GET ##################
router.get('/cliente', async function (req, res) {
    
    try {
        verifyToken(req.headers.xtoken)
        
        await controller.getAll(req, res)

    } catch (error) {
        return res.send('Nao foi possivel fazer a consulta')
    }
})

router.get('/cliente/:slug', async (req, res) => {

    const errors = validationResult(req.params.slug);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        await controller.getOne(req, res)
    } catch (error) {
        return res.send('Nao foi possivel fazer a consulta - Certifique-se der colocado os dados corretos')
    }
})


// ################## POST ##################
router.post('/cliente', [
    check('cliente_nome').isLength(3, 100),
    //check('cliente_email').isEmail(),
], async (req, res) => {

    if(!addon.add(req.body.cliente_email))
        return res.send('Nao foi possivel criar um novo cliente')
        
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

// ################## DELETE ##################
router.delete('/cliente', [
    check('cliente_email').not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        await controller.deleteOne(req, res)
    } catch (error) {
        return res.send('Nao foi possivel deletar o cliente')
    }
})

// ################## PATCH ##################
router.patch('/cliente', [
    check('cliente_email').isEmail(),
],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        try {
            await controller.patchOne(req, res)
        } catch (error) {
            return res.status(500).send('Nao foi possivel atualizar o cliente')
        }
    })

module.exports = router
