var training = require('./../db/connectdb');

var trainings;

var trainingsList = function (c) {    
    console.log('Seraching for ' + c);
    training.find({'tname':{'$regex' : c, '$options': 'i'}},{'tname':1,'status':1,'duration':1,'mode':1}, function (err, ts) {
        if (err) throw err;   
        trainings = ts;
    });
    return trainings;
}

var atraining = function (id) {    
    console.log('getting ' + id);
    training.find({'_id':id},{'tname':1,'status':1,'duration':1,'mode':1,'desc':1}, function (err, ts) {
        if (err) throw err;   
        trainings = ts;
    });
    return trainings;
}

module.exports = {
    getTrainingsList : trainingsList,
    getTrainingDetails : atraining
};
