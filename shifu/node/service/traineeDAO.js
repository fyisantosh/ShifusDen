var trainee = require('./../models/trainee');
var training = require('./../models/training');

var mongoose = require('mongoose');
var async = require("async");

var traineeDAO = {
    getAll: function (req, res) {
        t = req.query.t || 'f'; //Only first name
        f = req.query.f || ''; //Only first name
        l = req.query.l || ''; //Only last name
        ps = req.query.ps || ''; //Only first name
        o = req.query.o || ''; //Only first name
        wt = req.query.wt || 0; //With training details, if 1
        n = req.query.n || 10;
        p = req.query.p || 0;
        p = parseInt(n) * parseInt(p);

        //console.log(" f = " + f + " l = " + l + " ps = " + ps + " o = " + o);
        var conditions = [];
        if (f != '') conditions.push({ 'name.first': { '$regex': f, '$options': 'i' } });
        if (l != '') conditions.push({ 'name.last': { '$regex': l, '$options': 'i' } });
        if (o != '') conditions.push({ 'opco': { '$regex': o, '$options': 'i' } });
        if (ps != '') conditions.push({ '_id': { '$regex': ps, '$options': 'i' } });
        //console.log(conditions);

        var query = null
        if (t == 's') {
            query = trainee.find(
                {
                    $and: conditions
                }
            )
                .limit(parseInt(n))
                .skip(parseInt(p));
        } else {
            query = trainee.find(
                {
                    $or: conditions
                }
            )
        }

        //console.log(JSON.stringify(query._conditions));

        query.lean().exec(function (err, t1) {

            if (typeof t1 !== 'undefined' && t1) {
                if (wt == 1) {
                    total_tn = t1.length - 1;

                    async.whilst(
                        function () {
                            return total_tn >= 0;
                        },
                        function (callback) {
                            curr_tn = t1[total_tn]._id;
                            tr_q = training.findOne(
                                { "trainees": { $elemMatch: { "status": "p", "psno": curr_tn } } },
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
                } else {
                    query.exec(function (err, ts) {
                        if (err) throw err;
                        res.send(ts);
                    });
                }
            } else {
                res.send({});
            }
        });
    },

    getById: function (req, res) {
        trainee.findOne({ '_id': req.params['id'] }, function (err, ts) {
            if (err) throw err;
            res.send(ts);
        });
    },

    getByIdWithStats: function (req, res) {
        var sqlTrainee = trainee.findOne({ '_id': req.params['id'] });
        sqlTrainee.lean().exec(function (err, trn) {
            if (err) throw err;
            var qryStats = training.aggregate(
                [
                    { $unwind: "$trainees" },
                    { $match: { "trainees.psno": req.params['id'] } },
                    {
                        $project:
                        {
                            "tname": 1,
                            "status": "$trainees.status",
                            "target":"$trainees.target_date",
                            "pcomplete":"$trainees.pcomplete"
                        }
                    },
                    { $sort: { "status": 1 } }
                ]
            );
            qryStats.exec(function (err, trStats) {
                if (err) throw err;
                trn.stats = trStats;
                res.send(trn);
            });
        });
    }
}

module.exports = traineeDAO;