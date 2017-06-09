var trainee = require('./../models/trainee');
var training = require('./../models/training');

var mongoose = require('mongoose');
var async = require("async");

var statsDAO = {
    getAllStats: function (req, res) {
        var qryStats = training.aggregate([
            {
                $unwind: "$trainees"
            },
            {
                $lookup: {
                    from: "trainee",
                    localField: "trainees.psno",
                    foreignField: "_id",
                    as: "trainee_detail"
                }
            },
            {
                $unwind: "$trainee_detail"
            },
            {
                $project: {
                    "_id": 0,
                    "s": "$trainees.status",
                    "p": "$trainee_detail._id"
                }
            },
            {
                $group: {
                    "_id": "$s",
                    "stats": {
                        $sum: 1
                    }
                }
            }
        ]);

        qryStats.exec(function (err, st) {
            if (err) res.send(false);
            stats = st || {};
            var qAll = trainee.find({}).count(function (err, c) {
                st.push({ "_id": "t", "stats": c });
                res.send(st);
            });
        });
    },

    getStatsForTraining: function (req, res) {
        var qryStats = training.aggregate([
            {
                $match: {
                    "_id": req.params['id']
                }
            },
            {
                $unwind: "$trainees"
            },
            {
                $lookup: {
                    from: "trainee",
                    localField: "trainees.psno",
                    foreignField: "_id",
                    as: "trainee_detail"
                }
            },
            {
                $unwind: "$trainee_detail"
            },
            {
                $project: {
                    "_id": 0,
                    "s": "$trainees.status",
                    "p": "$trainee_detail._id"
                }
            },
            {
                $group: {
                    "_id": "$s",
                    "stats": {
                        $sum: 1
                    }
                }
            }
        ]);

        qryStats.exec(function (err, st) {
            if (err) res.send(false);
            stats = st || {};
            var qAll = trainee.find({}).count(function (err, c) {
                st.push({ "_id": "t", "stats": c });
                res.send(st);
            });
        });
    },

    getStatsForTrainingForOpco: function (req, res) {
        var qryStats = training.aggregate([
            {
                $match: {
                    "_id": req.params['id']
                }
            },
            {
                $unwind: "$trainees"
            },
            {
                $lookup: {
                    from: "trainee",
                    localField: "trainees.psno",
                    foreignField: "_id",
                    as: "trainee_detail"
                }
            },
            {
                $unwind: "$trainee_detail"
            },
            {
                $match: {
                    "trainee_detail.opco": req.params['opco']
                }
            },
            {
                $project: {
                    "_id": 0,
                    "s": "$trainees.status",
                    "p": "$trainee_detail._id"
                }
            },
            {
                $group: {
                    "_id": "$s",
                    "stats": {
                        $sum: 1
                    }
                }
            }
        ]);

        qryStats.exec(function (err, st) {
            if (err) res.send(false);
            stats = st || {};
            var qAll = trainee.find({ "opco": req.params['opco'] }).count(function (err, c) {
                st.push({ "_id": "t", "stats": c });
                res.send(st);
            });
        });
    },

    getStatsForOpco: function (req, res) {
        var qryStats = training.aggregate([
            {
                $unwind: "$trainees"
            },
            {
                $lookup: {
                    from: "trainee",
                    localField: "trainees.psno",
                    foreignField: "_id",
                    as: "trainee_detail"
                }
            },
            {
                $unwind: "$trainee_detail"
            },
            {
                $match: {
                    "trainee_detail.opco": req.params['opco']
                }
            },
            {
                $project: {
                    "_id": 0,
                    "s": "$trainees.status",
                    "p": "$trainee_detail._id"
                }
            },
            {
                $group: {
                    "_id": "$s",
                    "stats": {
                        $sum: 1
                    }
                }
            }
        ]);

        qryStats.exec(function (err, st) {
            if (err) res.send(false);
            stats = st || {};
            var qAll = trainee.find({ "opco": req.params['opco'] }).count(function (err, c) {
                st.push({ "_id": "t", "stats": c });
                res.send(st);
            });
        });
    },

    getStatsForOpcoForTraining: function (req, res) {
        var qryStats = training.aggregate([
            {
                $match: {
                    "_id": req.params['id']
                }
            },
            {
                $unwind: "$trainees"
            },
            {
                $lookup: {
                    from: "trainee",
                    localField: "trainees.psno",
                    foreignField: "_id",
                    as: "trainee_detail"
                }
            },
            {
                $unwind: "$trainee_detail"
            },
            {
                $match: {
                    "trainee_detail.opco": req.params['opco']
                }
            },
            {
                $project: {
                    "_id": 0,
                    "s": "$trainees.status",
                    "p": "$trainee_detail._id"
                }
            },
            {
                $group: {
                    "_id": "$s",
                    "stats": {
                        $sum: 1
                    }
                }
            }
        ]);

        qryStats.exec(function (err, st) {
            if (err) res.send(false);
            stats = st || {};
            var qAll = trainee.find({ "opco": req.params['opco'] }).count(function (err, c) {
                st.push({ "_id": "t", "stats": c });
                res.send(st);
            });
        });
    }
}


module.exports = statsDAO;