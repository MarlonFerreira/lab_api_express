const Mongoose = require('mongoose')

const produtoSchema = new Mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    detalhes: {
        type: String,
        require: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})
module.exports = Mongoose.model('produtos', produtoSchema)

