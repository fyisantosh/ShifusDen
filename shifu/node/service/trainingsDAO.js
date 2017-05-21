var training = require('./../models/training');
var trainee = require('./../models/trainee');

var trainingDAO = {
    getAll: function (req, res) {
        n = req.query.n || 10;
        p = req.query.p || 0;
        p = parseInt(n) * parseInt(p);
        q = req.query.q || '';
        e = req.query.e || 0;
        status_condition = [true];
        if (e == 1) { status_condition[1] = false };
        var query = training.find({ 'tname': { '$regex': q, '$options': 'i' }, 'status': { $in: status_condition } })
            .limit(parseInt(n))
            .skip(parseInt(p))
            .select({ 'tname': 1, 'status': 1, 'duration': 1, 'mode': 1 });

        query.exec(function (err, ts1) {
            if (err) throw err;
            console.log(ts1.length);
            res.send(ts1);
        });
    },

    getById: function (req, res) {
        console.log("Getting training details " + req.params['id']);
        training.find({ '_id': req.params['id'] })
            .populate('trainees.psno')
            .exec(function (err, ts1) {
                if (err) throw err;
                res.send(ts1);
            });
    },

    getTraineesByStatus: function (req, res) {
        training.aggregate(
            [
                { $match: { "_id": req.params['id'] } },
                {
                    $project: {
                        trainees: {
                            $filter: {
                                input: '$trainees',
                                as: 'trainees',
                                cond: { $eq: ['$$trainees.status', req.params['status']] }
                            }
                        },
                        _id: 1
                    }
                }
            ]
            , function (err, ts) {
                if (err) throw err;
                res.send(ts[0]);
            })
    }
}

module.exports = trainingDAO;