var express = require("express");
var cors = require('cors');
var trainingsDAO = require("./service/trainingsDAO");
var traineeDAO = require("./service/traineeDAO");



app = new express();
app.use(cors());


app.route('/trainings')
    .get(function (req, res) {
        trainingsDAO.getAll(req, res);
    });

app.route('/training/:id')
    .get(function (req, res) {
        trainingsDAO.getById(req, res);
    })
    .post(function (req, res) {
        res.send("Function unavailable")
    })
    .put(function (req, res) {
        res.send("Function unavailable")
    });

app.route('/training/:id/trainees')
    .get(function (req, res) {
        trainingsDAO.getTraineesByStatus(req, res);
    })
    .post(function (req, res) {
        res.send("Function unavailable")
    })
    .put(function (req, res) {
        res.send("Function unavailable")
    });

app.route('/trainees')
    .get(function (req, res) {
        traineeDAO.getAll(req, res);
    });

app.route('/trainee/:id')
    .get(function (req, res) {
        res.send("Function unavailable")
    })
    .post(function (req, res) {
        res.send("Function unavailable")
    })
    .put(function (req, res) {
        res.send("Function unavailable")
    });

app.get("/s", function (req, res) {
    res.send(new Date());
});


app.listen(3000, function () {
    console.log("app started");
});



