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
                { $unwind: "$trainees" },
                { $match: { "trainees.status": req.query.s } },
                {
                    $lookup:
                    {
                        from: "trainee",
                        localField: "trainees.psno",
                        foreignField: "_id",
                        as: "trainees.trainee_details"
                    }
                },
                { $unwind: "$trainees.trainee_details" },
                {
                    $project: {
                        "psno": "$trainees.psno",
                        "status_date": "$trainees.status_date",
                        "target_date": "$trainees.target_date",
                        "first_name": "$trainees.trainee_details.name.first",
                        "last_name": "$trainees.trainee_details.name.last",
                        "opco": "$trainees.trainee_details.opco",
                        "email": "$trainees.trainee_details.email",
                        "phone": "$trainees.trainee_details.phone"
                    }
                }
            ]
        ).exec(function (err, ts) {
            if (err) throw err;
            res.send(ts);
        });
    },

    addTraineesForTraining: function (req, res) {
        var idsToAdd = req.body.psnos;
        var strIdsToAdd = [];

        idsToAdd.forEach(function (psno) {
            //strIdToAdd = { "psno": psno, "status": "p", "status_date": req.body.status_date, "target_date": req.body.target_date }
            strIdToAdd = { "psno": psno, "status": "p"}
            strIdsToAdd.push(strIdToAdd);
        }, this);

        var opts = { runValidators: true };
        console.log(strIdsToAdd);
        
        training.update(
            { "_id": req.params['id'] },
            {
                $push: {
                    "trainees": {
                        $each: idsToAdd
                    }
                }
            }
        ).exec(opts,function(err, results){
            if (err) throw err;
            console.log(results);
            res.send(results);
        });

        res.send("Method in progress");
    }
}

module.exports = trainingDAO;