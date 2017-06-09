var express = require("express");
var cors = require('cors');
var trainingroute = require("./routers/training_route");
var traineeroute = require("./routers/trainee_route");
var statsroute = require("./routers/stats_route");
require("./mongo");

app = new express();
app.use(cors());


trainingroute(app);
traineeroute(app);
statsroute(app);

app.get("/s", function (req, res) {
    res.send(new Date());
});

app.listen(3000, function () {
    console.log("app started");
});



