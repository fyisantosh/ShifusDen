var mongoose = require('mongoose');

var Schema = mongoose.Schema;

if (mongoose.connection.readyState == 0)
  mongoose.connect('mongodb://localhost/shifudb');

var trainingsSchema = Schema({
  _id: String,
  tname: String,
  status: Boolean,
  duration: Number,
  mode: String,
  desc: String,
  trainees: [{ psno: { type: Number, ref: 'trainee' }, status: String, satus_date: Date, target_date: Date }]

});

var trainings = mongoose.model('trainings', trainingsSchema, 'trainings');


module.exports = trainings;