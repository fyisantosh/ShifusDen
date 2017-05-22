var trainee = require('./../models/trainee');

var traineeDAO = {
    getAll: function (req, res) {
        q = req.query.q || '';
        var query = trainee.find(
            {
                $or: [
                    { 'name.first': { '$regex': q, '$options': 'i' } },
                    { 'name.last': { '$regex': q, '$options': 'i' } }]
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
    }
}

module.exports = traineeDAO;