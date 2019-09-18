const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
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