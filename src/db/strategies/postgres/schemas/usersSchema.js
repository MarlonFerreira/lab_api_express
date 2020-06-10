//import { Sequelize } from "sequelize/types";
const Sequelize = require('sequelize')

const UsersSchema = {
    name: 'tab_users',
    schema: {
        user_id: {
            type: Sequelize.INTEGER,
            require: true,
            primaryKey: true
        },
        user_login: {
            type: Sequelize.STRING,
            require: true
        },
        user_password: {
            type: Sequelize.STRING,
            require: true
        },
        user_login_status: {
            type: Sequelize.BOOLEAN,
            require: true
        }
    },
    options: {
        tableName: 'TAB_USERS',
        freezeTableName: false,
        timestamps: false
    }
}

module.exports = UsersSchema