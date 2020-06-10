const router = require('express').Router();

router.get('/logout', function(req, res){
    return res.status(200).send({ auth: false, token: null })
})

module.exports = router