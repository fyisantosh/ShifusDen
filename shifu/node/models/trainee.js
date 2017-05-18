var mongoose = require('mongoose');
var Schema = mongoose.Schema;

if (mongoose.connection.readyState == 0)
  mongoose.connect('mongodb://localhost/shifudb');

var traineeSchema = new Schema({
  _id: Number,
  name: { first: String, last: String },
  opco: String,
  email: String,
  phone: String
});

var trainee = mongoose.model('trainee', traineeSchema, 'trainee');

module.exports = trainee;