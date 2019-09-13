const mongoose = require('mongoose');
const keys = require('../config/key');

mongoose.Promise = global.Promise
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', () => console.log('Successfully Connected'));