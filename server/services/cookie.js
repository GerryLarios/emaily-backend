const cookieSession = require('cookie-session');
const key = require('../config/key');

module.exports = cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [key.cookieKey]
})