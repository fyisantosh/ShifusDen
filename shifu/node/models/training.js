var mongoose = require('mongoose');

var Schema = mongoose.Schema;

if (mongoose.connection.readyState == 0)
  mongoose.connect('mongodb://localhost/shifudb');

var trainingSchema = new Schema({
  _id: String,
  tname: String,
  status: Boolean,
  duration: Number,
  mode: String,
  desc: String
});

var training = mongoose.model('trainings', trainingSchema, 'trainings');

module.exports = training;