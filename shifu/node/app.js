var express = require("express");
var cors = require('cors');
var trainingsDAO = require("./service/trainingsDAO");

app = new express();
app.use(cors());

app.get("/trainings", function (req, res) {    
    n = req.query.n || 10;
    p = req.query.p || 0;
    p = parseInt(n) * parseInt(p);
    q = req.query.q || '';
    console.log("Getting " + req.query.n + " trainings starting from " + req.query.p + " with term " + req.query.q);
    res.send(trainingsDAO.getTrainingsList(n,p,q));
});

app.get("/training/:id", function (req, res) {
    console.log("Getting training details " + req.params['id']);
    res.send(trainingsDAO.getTrainingDetails(req.params['id']));
});

app.listen(3000, function () {
    console.log("app started");
});



