var express = require("express");
var cors = require('cors');
var trainingsDAO = require("./service/trainingsDAO");

app = new express();
app.use(cors())

app.get("/trainings", function (req, res) {
    console.log("Getting trainings");
    res.send(trainingsDAO.getTrainingsList(''));
});

app.get("/trainings/:searchterm", function (req, res) {
    console.log("Getting trainings matching " + req.params['searchterm']);
    res.send(trainingsDAO.getTrainingsList(req.params['searchterm']));
});

app.get("/training/:id", function (req, res) {
    console.log("Getting training details " + req.params['id']);
    res.send(trainingsDAO.getTrainingDetails(req.params['id']));
});

app.listen(3000, function () {
    console.log("app started");
});



