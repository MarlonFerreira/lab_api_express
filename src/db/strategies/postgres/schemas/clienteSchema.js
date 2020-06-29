//import { Sequelize } from "sequelize/types";
const Sequelize = require('sequelize')


const ClientesSchema = {
    name: 'tab_clientes',
    schema: {
        cliente_id: {
            type: Sequelize.INTEGER,
            require: true
        },
        cliente_nome: {
            type: Sequelize.STRING,
            require: true
        },
        cliente_id_pais: {
            type: Sequelize.INTEGER,
            require: true,
        },
        cliente_id_estado: {
            type: Sequelize.INTEGER,
            require: true,
        },
        cliente_id_municipio: {
            type: Sequelize.INTEGER,
            require: true,
        },
        cliente_endereco: {
            type: Sequelize.STRING,
            require: false
        },
        cliente_telefone: {
            type: Sequelize.STRING,
            require: false
        },
        cliente_email: {
            type: Sequelize.STRING,
            primaryKey: true,
            require: false
        },
        cliente_password: {
            type: Sequelize.STRING,
            require: true
        },
        cliente_status: {
            type: Sequelize.BOOLEAN,
        },
        role: {
            type: Sequelize.STRING         
        }
    },
    options: {
        tableName: 'TAB_CLIENTES',
        freezeTableName: false,
        timestamps: false
    }
}

module.exports = ClientesSchema