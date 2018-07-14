var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var config = require('./config/database');
var bodyParser = require('body-parser');
var session = require('express-session');

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

// BODY-PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.JSON());

// EXPRESS-SESSION MIDDLEWARE
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: true,
		cookie: { secure: true }
	})
);

app.use(require('connect-flash')());
app.use(function(req, res, next) {
	res.locals.messages = require('express-messages')(req, res);
	next();
});

// SET ROUTES

var pages = require('./routes/pages');
var adminPages = require('./routes/admin_pages');

app.use('/', pages);
app.use('/admin/pages', adminPages);

// starting the server
app.listen(3000, function() {
	console.log('server started at port 3000');
});
