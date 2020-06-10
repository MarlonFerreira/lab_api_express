const Mongoose = require('mongoose')

var imagemProdutoSchema = new Mongoose.Schema({
    img:
    {
        data: Buffer,
        contentType: String
    }
}
);

module.exports = Mongoose.model('imagemProduto', imagemProdutoSchema)
