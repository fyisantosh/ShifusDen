var trainee = require('./../models/trainee');
var training = require('./../models/training');

var mongoose = require('mongoose');
var async = require("async");


var traineeDAO = {
    getAll: function (req, res) {
        f = req.query.f || ''; //Only first name
        l = req.query.l || ''; //Only last name
        p = req.query.p || ''; //Only first name
        wt = req.query.wt || 0; //With training details, if 1

        var query = trainee.find(
            {
                $and: [
                    { 'name.first': { '$regex': f, '$options': 'i' } },
                    { 'name.last': { '$regex': l, '$options': 'i' } },
                    { '_id': { '$regex': p, '$options': 'i' } }]
            }
        );

        if (wt == 1) {
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
        } else {
            query.exec(function (err, ts) {
                if (err) throw err;
                res.send(ts);
            });
        }
    },

    getById: function (req, res) {
        trainee.find({ '_id': req.params['id'] }, function (err, ts) {
            if (err) throw err;
            res.send(ts);
        });
    }
}

module.exports = traineeDAO;