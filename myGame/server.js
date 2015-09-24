//server.js

//modules

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    flash = require('connect-flash'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    db = require('./config/db.js'),
    morgan = require('morgan'),
    port = process.env.PORT || 8080;

//connect to db
mongoose = require('mongoose');
mongoose.connect(db.url);

require('./config/passport.js')(passport);

//parse body
//parse application.json
app.use(bodyParser.json());
//parse vnd.api+json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
//parse x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//override X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'));
//set static file location
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/app/views');

app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({ secret: 'rolePlaysAreAwesomeAndSoIsMyGame' }));
app.use(passport.initialize());
app.use(passport.session());

//routes
require('./app/routes')(app, passport);

app.listen(port);

console.log(port + ' is the port you are looking for.');

//exposing app
exports = module.exports = app;
