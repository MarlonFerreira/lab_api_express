const Sequelize = require('sequelize')

const ProdutoSchema = {
    name: 'tab_produtos',
    schema: {
        produto_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            require: true
        },
        produto_categoria_id: {
            type: Sequelize.INTEGER,
            require: true
        },
        produto_nome: {
            type: Sequelize.STRING,
            require: true,
        },
        produto_preco: {
            type: Sequelize.DOUBLE,
            require: true,
        },
        produto_detalhes: {
            type: Sequelize.STRING,
            require: true,
        },
    },
    options: {
        tableName: 'tab_produtos',
        freezeTableName: false,
        timestamps: false
    }
}

module.exports = ProdutoSchema