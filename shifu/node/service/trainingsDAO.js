var training = require('./../db/connectdb');

var trainings;

var trainingsList = function (n, s, q) {
    console.log("Querying " + n + " trainings starting from " + s + " with term " + q);
    var query = training.find({ 'tname': { '$regex': q, '$options': 'i' } })
        .limit(parseInt(n))
        .skip(parseInt(s))
        .select({ 'tname': 1, 'status': 1, 'duration': 1, 'mode': 1 });
    
    query.exec(function (err, ts) {
        if (err) throw err;
        trainings = ts;
    });
    return trainings;
}

var atraining = function (id) {
    console.log('getting ' + id);
    training.find({ '_id': id }, { 'tname': 1, 'status': 1, 'duration': 1, 'mode': 1, 'desc': 1 }, function (err, ts) {
        if (err) throw err;
        trainings = ts;
    });
    return trainings;
}

module.exports = {
    getTrainingsList: trainingsList,
    getTrainingDetails: atraining
};
