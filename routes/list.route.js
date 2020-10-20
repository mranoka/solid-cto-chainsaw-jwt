module.exports = function(app) {
    const lists = require('../controllers/lists.controller');
    app.post('/postnew', lists.list)
}