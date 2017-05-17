var trainee = require('./../models/trainee');

var traineeDAO = {
    getAll: function (req, res) {
        var query = trainee.find({});

        query.exec(function (err, ts) {
            if (err) throw err;
            console.log(ts.length);
            res.send(ts);
        });
    },

    getById: function (req, res) {
        trainee.find({ '_id': req.params['id'] }, function (err, ts) {
            if (err) throw err;
            res.send(ts);
        });
    }
}

module.exports = traineeDAO;