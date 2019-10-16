const express = require('express');
const passport = require('passport');
const proxy = require('../client/node_modules/http-proxy-middleware');

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

const target = { target: "http://localhost:5000" }
app.use(proxy('/auth/google', target))
app.use(proxy('/auth/google/callback', target))
app.use(proxy('/api/current_user', target))
app.use(proxy('/api/**', target))

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