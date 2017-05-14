var express = require("express");
var cors = require('cors');
var trainingsDAO = require("./service/trainingsDAO");

app = new express();
app.use(cors());

app.get("/trainings", function (req, res) {
    console.log("Getting " + req.query.n + " trainings starting from " + req.query.s + " with term " + req.query.q);
    n = req.query.n || 10;
    s = req.query.s || 0;
    q = req.query.q || '';
    res.send(trainingsDAO.getTrainingsList(n,s,q));
});

app.get("/training/:id", function (req, res) {
    console.log("Getting training details " + req.params['id']);
    res.send(trainingsDAO.getTrainingDetails(req.params['id']));
});

app.listen(3000, function () {
    console.log("app started");
});



