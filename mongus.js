var http = require("http");
//var mongo = require("mongodb");
var mongoose = require('mongoose');

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  // Create your schemas and models here.
});

mongoose.connect('mongodb://127.0.0.1/test');
