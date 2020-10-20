const { usersFind } = require("../controllers/users.controller")

module.exports = function (app) {
    const users = require('../controllers/users.controller');
    app.get('/login/:info', users.usersFind)
}