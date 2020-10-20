module.exports = function(app) {
    const lists = require('../controllers/lists.controller');
    app.get('/get/:user', lists.getUserList)
}