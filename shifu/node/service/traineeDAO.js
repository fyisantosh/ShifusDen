var trainee = require('./../models/trainee');
var training = require('./../models/training');

var mongoose = require('mongoose');
var async = require("async");


var traineeDAO = {
    getAll: function (req, res) {
        q = req.query.q || '';
        var query = trainee.find(
            {
                $or: [
                    { 'name.first': { '$regex': q, '$options': 'i' } },
                    { 'name.last': { '$regex': q, '$options': 'i' } },
                    { '_id': { '$regex': q, '$options': 'i' } }]
            }
        );

        query.exec(function (err, ts) {
            if (err) throw err;
            res.send(ts);
        });
    },

    getById: function (req, res) {
        trainee.find({ '_id': req.params['id'] }, function (err, ts) {
            if (err) throw err;
            res.send(ts);
        });
    },

    getAllWithActiveTraining: function (req, res) {
        q = req.query.q || '';
        var query = trainee.find(
            {
                $or: [
                    { 'name.first': { '$regex': q, '$options': 'i' } },
                    { 'name.last': { '$regex': q, '$options': 'i' } },
                    { '_id': { '$regex': q, '$options': 'i' } }]
            }
        );

        query.lean().exec(function (err, t1) {
            total_tn = t1.length - 1;

            async.whilst(
                function () {
                    return total_tn >= 0;
                },
                function (callback) {
                    curr_tn = t1[total_tn]._id;
                    tr_q = training.findOne(
                        { "trainees": { $elemMatch: { "status": "a", "psno": curr_tn } } },
                        { "tname": 1, _id: 0 }
                    );

                    tr_q.lean().exec(function (er, tg1) {
                        if (tg1 != null) {
                            t1[total_tn].active_training = tg1.tname;
                        }
                        total_tn--;
                        callback(null, total_tn);
                    });
                },
                function (err, n) {                    
                    res.send(t1);
                }
            );

        });
    }
}

module.exports = traineeDAO;