const ICrud = require('../interfaces/intefaceCrud')
const Sequelize = require('sequelize')

class Postgres extends ICrud {
    constructor(connection, schema) {
        super()
        this._connection = connection
        this._schema = schema
    }

    static async connect() {
        const connection = new Sequelize(process.env.POSTGRES_URL,
            {
                //operatorsAliases: false,
                logging: false,
                quoteIdentifiers: false,
                ssl: process.env.SSL_DB,
                dialectOptions: {
                    ssl: process.env.SSL_DB
                }
            }
        )
        console.group('Database Postgres rodando')
        return connection
    }

    async isConnected() {
        try {
            await this._connection.authenticate()
            return true
        }
        catch (error) {
            console.error('Falha na tentativa de conectar ao Postgres', error)
            return false
        }
    }

    async closeConnection() {
        this._connection.close()
        return true
    }

    static async defineModel(connection, schema) {
        const model = connection.define(schema.name, schema.schema, schema.options)
        await model.sync()
        return model
    }

    async read(item = {}, skip = 0, limit = 10) {
        return this._schema.findAll({ where: item, skip: skip, limit: limit, raw: true })
    }

    async create(item) {
        const {
            dataValues
        } = await this._schema.create(item)
        return dataValues
    }

    async update(id, item) {
        return this._schema.update(item, { where: id }) //id : id
    }

    async delete(id_item) {
        if (Object.keys(id_item).length === 0)
            return 0
        else
            return this._schema.destroy({ where: id_item }) //id : id
    }

}

module.exports = Postgres