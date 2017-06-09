var mongoose = require('mongoose');
var config = require('./config/config.json');

mongoose.connect(config.db_url);