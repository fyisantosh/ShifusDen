var mongoose = require('mongoose');
var Schema = mongoose.Schema;

if (mongoose.connection.readyState == 0)
  mongoose.connect('mongodb://localhost/shifudb');

var traineeSchema = Schema({
  _id: String,
  opco: String,
  name: { first: String, last: String },
  email: String,
  phone: String
});
var trainee = mongoose.model('trainee', traineeSchema, 'trainee');

module.exports = trainee;