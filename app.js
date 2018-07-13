var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var config = require('./config/database');

// CONNECT TO MONGODB
mongoose.connect(config.database);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('we are connected to the databse');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// public folder setup
app.use(express.static('public'));

// INDEX ROUTE

app.get('/', function(req, res) {
	res.send('Working!');
});

// starting the server
app.listen(3000, function() {
	console.log('server started at port 3000');
});
