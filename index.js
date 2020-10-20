require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');

// helmet provides extra layer of security
app.use(helmet());

// include body-parser to allow access to req.body object
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes to handle requests from client
require('./routes/users.route.js')(app);
require('./routes/auth.route.js')(app);
require('./routes/list.route.js')(app);
require('./routes/getUserList.route.js')(app);


// uri for connecting to database from Atlas
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fojyg.mongodb.net/test?retryWrites=true&w=majority`
mongoose.Promise = global.Promise;

mongoose.connect(uri, {
	useMongoClient: true
});

mongoose.connection.on('error', function() {
	console.log('Connection to Mongo established.');
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

module.exports = app;

app.listen(PORT, () => {
    console.log(`Now listening at http://localhost:${PORT}`)
})
