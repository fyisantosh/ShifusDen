var bodyParser = require('body-parser')
var trainingDAO = require("../service/trainingDAO");

var jsonParser = bodyParser.json()

module.exports = function(app){

    app.route('/trainings')
        .get(function (req, res) {
            trainingDAO.getAll(req, res);
        });

    app.route('/training/:id')
        .get(function (req, res) {
            trainingDAO.getById(req, res);
        })
        .post(function (req, res) {
            res.send("Function unavailable");
        })
        .put(function (req, res) {
            res.send("Function unavailable");
        });

    app.route('/training/:id/stats')
        .get(function (req, res) {
            trainingDAO.getTrainingStats(req, res);
        });

    app.route('/training/:id/trainees')
        .get(function (req, res) {
            trainingDAO.getTraineesByStatus(req, res);
        })
        .post(function (req, res) {
            res.send("Function unavailable");
        })
        .put(jsonParser, function (req, res) {
            switch (req.body.updatedStatus) {
                case 'p':
                    trainingDAO.addTraineesForTraining(req, res);
                    break;
                case 'c':
                    trainingDAO.updateTraineesForTrainingCompleted(req, res);
                    break;
                case 'a':
                    trainingDAO.updateTraineesForTrainingAbandoned(req, res);
                    break;
                default:
                    res.send("Unknown operation");
            }
        });
}