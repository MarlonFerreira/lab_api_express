const router = require('express').Router()
// const MongoDb = require('./../../db/strategies/mongodb/mongodb')
// const schema = require('./../../db/strategies/mongodb/schemas/imagemProdutoSchema')
// const Context = require('./../../db/strategies/base/contextStrategy')


router.get('/', function(req, res){
    //let context = new Context(new MongoDb(connectionMongoDB, schema))

    //let result = await context.read({})
    
    return res.send('Index /')
})

module.exports = router
