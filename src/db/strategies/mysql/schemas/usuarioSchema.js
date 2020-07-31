const Sequelize = require('sequelize')

const UsuarioSchema = {
    name: 'tab_usuarios',
    schema: {
        usuario_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        usuario_nome: {
            type: Sequelize.STRING,
            require: true
        },
        usuario_email: {
            type: Sequelize.STRING,
            require: true
        },
        usuario_password: {
            type: Sequelize.STRING,
            require: true
        },
        usuario_login_status: {
            type: Sequelize.BOOLEAN,
            require: true,
            defaultValue: true
        }
    },
    options: {
        tableName: 'TAB_USUARIOS',
        freezeTableName: false,
        timestamps: false
    }
}

module.exports = UsuarioSchema