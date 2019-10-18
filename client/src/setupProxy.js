const proxy = require('http-proxy-middleware')

const target = { target: "http://localhost:5000" }
module.exports = function (app) {
    app.use(proxy('/auth/google', target))
    app.use(proxy('/auth/google/callback', target))
    app.use(proxy('/api/current_user', target))
    app.use(proxy('/api/**', target))
}
