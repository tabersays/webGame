//server.js

//modules

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

//configuration

//config files
var db = require('./config/db.js');

//set port
var port = process.env.PORT || 8080;

//connect to db
mongoose = require('mongoose');
mongoose.connect(db.url);

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

//routes
require('./app/routes')(app);

//start on localhost port 8080
app.listen(port);

console.log(port + ' is the port you are looking for.');

//exposing app
exports = module.exports = app;
