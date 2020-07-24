const router = require('express').Router()

router.get('/', function(req, res){
    
    return res.send('Index /')
})

module.exports = router
