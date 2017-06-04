var express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser')
var trainingDAO = require("./service/trainingDAO");
var traineeDAO = require("./service/traineeDAO");
var statsDAO = require("./service/statsDAO");


var jsonParser = bodyParser.json()

app = new express();
app.use(cors());


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

app.route('/trainees')
    .get(function (req, res) {
        traineeDAO.getAll(req, res);
    });

app.route('/trainee/:id')
    .get(function (req, res) {
        traineeDAO.getById(req, res);
    })
    .post(function (req, res) {
        res.send("Function unavailable");
    })
    .put(function (req, res) {
        res.send("Function unavailable");
    });

app.route('/trainee/:id/stats')
    .get(function (req, res) {
        traineeDAO.getByIdWithStats(req, res);
    });

app.get("/s", function (req, res) {
    res.send(new Date());
});

app.route('/stats')
    .get(function (req, res) {
        statsDAO.getAllStats(req, res);
    });

app.route('/stats/training/:id')
    .get(function (req, res) {
        statsDAO.getStatsForTraining(req, res);
    });

app.route('/stats/training/:id/opco/:opco')
    .get(function (req, res) {
        statsDAO.getStatsForTrainingForOpco(req, res);
    });

app.route('/stats/opco/:opco')
    .get(function (req, res) {
        statsDAO.getStatsForOpco(req, res);
    });

app.route('/stats/opco/:opco/training/:id')
    .get(function (req, res) {
        statsDAO.getStatsForOpcoForTraining(req, res);
    });    

app.listen(3000, function () {
    console.log("app started");
});



