var mongoose = require('mongoose');

var Schema = mongoose.Schema;

if (mongoose.connection.readyState == 0)
  mongoose.connect('mongodb://localhost/shifudb');

var trainingSchema = Schema({
  _id: String,
  tname: String,
  status: Boolean,
  duration: Number,
  mode: String,
  desc: String,
  trainees: [{_id:false, psno: { type: String, ref: 'trainee' }, status: String, status_date: Date, target_date: Date }]

}, { versionKey: false });

var training = mongoose.model('training', trainingSchema, 'training');


module.exports = training;