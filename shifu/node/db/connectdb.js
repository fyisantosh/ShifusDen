var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/trainingdb');

var trainingSchema = new Schema({
  _id:  String,
  tname: String,
  status:   Boolean,
  duration: Number,
  mode: String,
  desc: String
});

var training = mongoose.model('training', trainingSchema,'training');

module.exports = training;