var express = require("express");
var cors = require('cors');
var trainingsDAO = require("./service/trainingsDAO");
var traineeDAO = require("./service/traineeDAO");

app = new express();
app.use(cors());

app.get("/trainings", function (req, res) {
    trainingsDAO.getAll(req, res);
});

app.get("/training/:id", function (req, res) {
    trainingsDAO.getById(req, res);
});

app.get("/training/:id/:status", function (req, res) {
    trainingsDAO.getTraineesByStatus(req, res);
});

app.get("/trainees", function (req, res) {
    traineeDAO.getAll(req, res);
});

app.get("/s", function (req, res) {
    res.send(new Date());
});


app.listen(3000, function () {
    console.log("app started");
});



