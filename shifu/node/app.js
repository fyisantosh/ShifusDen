var express = require("express");
var cors = require('cors');
var training = require('./db/connectdb');
var trainingsDAO = require("./service/trainingsDAO");

app = new express();
app.use(cors());

app.get("/trainings", function (req, res) {
    trainingsDAO.getAll(req, res);
});

app.get("/training/:id", function (req, res) {
    trainingsDAO.getById(req, res);
});


app.get("/s", function (req, res) {
    res.send(new Date());
});


app.listen(3000, function () {
    console.log("app started");
});



