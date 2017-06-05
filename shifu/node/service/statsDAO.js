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
                $group: {
                    "_id": { "status": "$trainees.status" },
                    "crowd": {
                        "$sum": 1
                    }
                }
            },
            {
                $group: {
                    "_id": null,
                    "stats": {
                        "$push": {
                            "status": "$_id.status",
                            "count": "$crowd"
                        }
                    }
                }
            }
        ]);

        qryStats.exec(function (err, st) {
            if (err) res.send(false);
            stats = st[0];
            var qAll = trainee.find({}).count(function (err, c) {
                stats.totalTrainees = c;
                res.send(stats);
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
                $group: {
                    "_id": {
                        "status": "$trainees.status"
                    },
                    "crowd": {
                        "$sum": 1
                    }
                }
            },
            {
                $group: {
                    "_id": null,
                    "stats": {
                        "$push": {
                            "status": "$_id.status",
                            "count": "$crowd"
                        }
                    }
                }
            }
        ]);

        qryStats.exec(function (err, st) {
            if (err) res.send(false);
            stats = st[0] || {};
            var qAll = trainee.find({}).count(function (err, c) {
                stats.totalTrainees = c;
                res.send(stats);
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
                $group: {
                    "_id": {
                        "status": "$trainees.status"
                    },
                    "crowd": {
                        "$sum": 1
                    }
                }
            },
            {
                $group: {
                    "_id": null,
                    "stats": {
                        "$push": {
                            "status": "$_id.status",
                            "count": "$crowd"
                        }
                    }
                }
            }
        ]);

        qryStats.exec(function (err, st) {
            if (err) res.send(false);
            stats = st[0] || {};
            var qAll = trainee.find({ "opco": req.params['opco'] }).count(function (err, c) {
                stats.totalTrainees = c;
                res.send(stats);
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
                $group: {
                    "_id": { "opco": "$trainee_detail.opco", "status": "$trainees.status" },
                    "crowd": {
                        "$sum": 1
                    }
                }
            },
            {
                $group: {
                    "_id": "$_id.opco",
                    "stats": {
                        "$push": {
                            "status": "$_id.status",
                            "count": "$crowd"
                        }
                    }
                }
            }
        ]);

        qryStats.exec(function (err, st) {
            if (err) res.send(false);
            stats = st[0] || {};
            var qAll = trainee.find({ "opco": req.params['opco'] }).count(function (err, c) {
                stats.totalTrainees = c;
                res.send(stats);
            });
        });
    },

    getStatsForOpcoForTraining: function (req, res) {
        var qryStats = training.aggregate([
            {
                $match: {
                    "_id": req.params['id']
                }
            }, {
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
                $group: {
                    "_id": { "opco": "$trainee_detail.opco", "status": "$trainees.status" },
                    "crowd": {
                        "$sum": 1
                    }
                }
            },
            {
                $group: {
                    "_id": "$_id.opco",
                    "stats": {
                        "$push": {
                            "status": "$_id.status",
                            "count": "$crowd"
                        }
                    }
                }
            }
        ]);

        qryStats.exec(function (err, st) {
            if (err) res.send(false);
            stats = st[0] || {};
            var qAll = trainee.find({ "opco": req.params['opco'] }).count(function (err, c) {
                stats.totalTrainees = c;
                res.send(stats);
            });
        });
    }
}


module.exports = statsDAO;