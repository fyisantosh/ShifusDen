var statsDAO = require("../service/statsDAO");

module.exports = function(app){
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
}