const iCrud = require('../interfaces/intefaceCrud')

class contextStrategy extends iCrud{
    constructor(context){
        super()
        this._database = context
    }

    read(item, skip, limit) {
        return this._database.read(item, skip, limit)
    }

    create(item) {
        return this._database.create(item)
    }

    update(id, item) {
        return this._database.update(id, item)
    }

    delete(id) {
        return this._database.delete(id)
    }

    static connect(){
        return this._database.connect()
    }
    
    isConnected() {
        return this._database.isConnected()
    }

    closeConnection(){
        return this._database.closeConnection()
    }

}

module.exports = contextStrategy