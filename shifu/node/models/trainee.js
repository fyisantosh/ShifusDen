var mongoose = require('mongoose');
var config = require('../config/config.json');
var Schema = mongoose.Schema;

// if (mongoose.connection.readyState == 0)
//   mongoose.connect(config.db_url);

var traineeSchema = Schema({
  _id: String,
  opco: String,
  name: { first: String, last: String },
  email: String,
  phone: String
}, { versionKey: false });
var trainee = mongoose.model('trainee', traineeSchema, 'trainee');

module.exports = trainee;