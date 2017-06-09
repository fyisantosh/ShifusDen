var traineeDAO = require("../service/traineeDAO");

module.exports = function(app){
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

}