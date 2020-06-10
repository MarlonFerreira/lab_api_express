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


module.exports = router



    //     try {

    //         await _contextCliente.create(req.body)
    //         await _contextUser.create({ user_login: req.body.cliente_email, user_password: senha })
    //         return res.status(200).send('Usuario cadastrado com sucesso!')

    //     } catch (error) {
    //         await _contextCliente.delete(req.body.cliente_email)
    //         await _contextUser.delete(user_emailreq.body.cliente_email)
    //         return res.status(400).send(error)
    //     }
    // })


        // let transaction;

        // try {
        //     // get transaction
        //     transaction = await sequelize.transaction();

        //     // step 1
        //     await Model.destroy({ where: { id }, transaction });

        //     // step 2
        //     await Model.create({}, { transaction });

        //     // step 3
        //     await Model.update({}, { where: { id }, transaction });

        //     // commit
        //     await transaction.commit();

        // } catch (err) {
        //     // Rollback transaction only if the transaction object is defined
        //     if (transaction) await transaction.rollback();
        // }


        // return sequelize.transaction(function (t1) {
        //     return Promise.all([
        //         _contextCliente.create(req.body, { transaction: t1 }),
        //         _contextUser.create({ user_login: req.body.cliente_email, user_password: senha },
        //             { transaction: t1 })
        //     ]);
        // });