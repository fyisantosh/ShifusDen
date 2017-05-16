var training = require('./../db/connectdb');

var trainingDAO = {
    getAll: function (req, res) {
        n = req.query.n || 10;
        p = req.query.p || 0;
        p = parseInt(n) * parseInt(p);
        q = req.query.q || '';
        var query = training.find({ 'tname': { '$regex': q, '$options': 'i' } })
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
        training.find({ '_id': req.params['id'] }, { 'tname': 1, 'status': 1, 'duration': 1, 'mode': 1, 'desc': 1 }, function (err, ts1) {
            if (err) throw err;
            res.send(ts1);
        });
    }
}

module.exports = trainingDAO;