const express = require('express');
const passport = require('passport');
const proxy = require('http-proxy-middleware')

require('./services/connection')
require('./model/User');
require('./services/passport');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(require('./services/cookie'))
app.use(passport.initialize())
app.use(passport.session())

const proxyConf = proxy({ target: "http://localhost:4000", changeOrigin: true });
app.use('/auth/google/callback', proxyConf)
app.use('/auth/google', proxyConf)
app.use('api/current_user', proxyConf)

require('./routes/auth')(app);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;