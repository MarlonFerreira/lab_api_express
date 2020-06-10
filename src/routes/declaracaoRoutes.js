// ------- ROTAS LIVRES-------
const indexRoutes = require('./index/indexRoutes')
const authRoutes = require('./auth/authRoutes')
const registroRoutes = require('./registro/registroRouters')

// ------- ROTAS PRIVADAS-------
const clienteRoutes = require('./cliente/clienteRoutes')
const logoutRoutes = require('./auth/logoutRoutes')

const routes = [
    clienteRoutes,
    logoutRoutes,
    indexRoutes,
    authRoutes,
    registroRoutes
]

module.exports = routes