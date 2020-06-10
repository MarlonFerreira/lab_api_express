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

module.exports = router


// if(Object.keys(result).length === 0){
//     return res.send('Usuario ou senha invalidos') 
// }