const acl = require('express-acl');

acl.config({
    filename: '/helpers/acl/acl.json',
    baseUrl: '/'
})

module.exports = acl