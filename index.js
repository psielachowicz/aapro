var http = require("http");
var cookieParser = require('cookie-parser');
var host = "127.0.0.1";
var port = 1337;
var express = require("express");
var fs = require("fs");
var mongo = require("mongodb");
var dbhost = "127.0.0.1";
var dbport = "27017";
var app = require('express')();
 var path = require('path');

//var app = express();
var log = fs.readFileSync("logowanie.html");
var zalog = fs.readFileSync("zalog.html");
var cookieParser = require('cookie-parser');
app.use(cookieParser());

var http = require('http').Server(app);
var io = require('socket.io')(http);
var session      = require('express-session');
app.use(express.static(path.join(__dirname, 'public')));
//serve static assets
  //      self.app.use(express.static(__dirname));
app.use('/css', express.static(__dirname + 'public/css'));
var Mongoose = require('mongoose');
var myConnection = Mongoose.createConnection(dbhost, dbport);

var MySchema = new Mongoose.Schema({
  dzien: { type: String }
, zadanie: String
}); 
  var  MyModel = myConnection.model('mycollection', MySchema);
var myDocument = new MyModel({});
io.on('connection', function(socket){
	console.log('1');
  socket.on('chat message', function(msg){
	 console.log(msg);
	 
	 var zapa = new MyModel({
  dzien: 'x'
, zadanie: msg
});
console.log("narazie ok");
zapa.save(function(err, zada) {
  if (err) return console.error(err);
  console.dir(zapa);
	}); 
    io.emit('chat message', msg);
  });
});

app.use(session({secret: 'piano dog'}));
var noton = fs.readFileSync("nowzad.html");
var content = fs.readFileSync("sock.html");

app.get('/', function(req, res){

 res.setHeader("Content-Type", "text/html");
	res.send(log);
 
});
app.get('/log', function(req, res){
	res.setHeader("Content-Type", "text/html");
	res.send(log);
});
app.get('/zarej', function(req,res){
	//io.sockets.emit('wpisy', wpisy);
newUser(req.query.user, req.query.pass,req.query.klasa, function(dany){
	});
	res.setHeader("Content-Type", "text/html");
	res.send("Dziękujemy za rejestracje, można się już zalogować"+log);
	
});
app.get('/zalog', function(req, res){
	req.session.user = req.query.user;
	res.redirect('/i');
	//res.send("</body></html>");
});
app.get('/noton', function(req, res){
	res.setHeader("Content-Type", "text/html");
	res.send(noton);
});
app.get('/noonline', function(req, res){
	var ind = fs.readFileSync("index.html");
	MyModel.find({ dzien: 'x' }, function(err, zal) {
 var resn;
  zal.forEach(function(zal){
	
			resn += "<h3>"+zal.zadanie+"</h3>";
			console.log(zal.zadanie);
	});
  //resn += "</body></html>";
  res.send(resn+ind);
});
  //res.sendfile('index.html');
});
app.get('/ap', function(req, res){
	res.sendfile('temat.html');
   
});
app.get('/he', function(req, res){
	
  res.sendfile('Tresc.html');
});

app.get('/zapis', function(req, res){
	
  var zada = new MyModel({
  dzien: req.query.dzien
, zadanie: req.query.textarea
});
console.log("narazie ok");
zada.save(function(err, zada) {
  if (err) return console.error(err);
  console.dir(zada);
});
	
	res.redirect("/i");
});
app.get('/pp', function(req, res){
	var ul = '';
	//res.writeHead(200, {'Content-Type': 'text/html'});
	
	getUser("Pawel", function(dany){
		dany.forEach(function(dany){
			ul +="<li><strong>"+dany.haslo+" "+dany.login+" "+dany.klasa+"</strong></li>";
	});
	content = content.toString().replace("yyy", ul);
	res.setHeader("Content-Type", "text/html");
	res.send(content); 
});
});
var echo;
app.get('/i', function(req,res){
	var resp = ("<h1>Zalogowany jako "+req.session.user+zalog+"</h1>");
	res.setHeader("Content-Type", "text/html");
	
	var userr = req.param('user', null);
	resp += "<div id='zalog'>"
	if(req.query.dzien){
	MyModel.find({ dzien: req.query.dzien }, function(err, zal) {
 
  zal.forEach(function(zal){
	
			resp += "<h3>"+zal.zadanie+"</h3>";
	});
	resp += "</div>";
  resp += "</body></html>";
  res.send(resp);
});
}
else
{
	res.send(resp);
}
	
	
	
	
	
});
//app.listen(port, host);
	//var io = require('socket.io').listen(server);
	http.listen(port, function(){
  console.log('listening on *:3000');
});
var wpisy;
var wpist;


function newUser(nazwa,haslo,klasa,callback) {

var db = new mongo.Db("portal",new mongo.Server(dbhost, dbport, {}));
db.open(function(error){
	console.log("..."+ dbport);
	db.collection("dany", function(error, collection){
		console.log("jest git");
		wpisy = collection;
		collection.insert({
			//id: id.toString(),
			login: nazwa.toString(),
			haslo: haslo.toString(),
			klasa: klasa.toString(),
			 }, function(){
				console.log("wstawiono");
		});
	//	collection.find({"id":id.toString()}, function(error, cursor){
			//cursor.toArray(function(error,dane){
			//	callback(dane);
				//console.log(dane);
				//res.write(dane);
			//});
		//});
			
});
});
}
function noweZadanie(dzien,zadanie,callback) {

var db = new mongo.Db("vortal",new mongo.Server(dbhost, dbport, {}));
db.open(function(error){
	console.log("..."+ dbport);
	db.collection("zad", function(error, collection){
		console.log("jest git");
		wpist = collection;
		collection.insert({
			//id: id.toString(),
			//klasa: klasa.toString(),
			dzien: dzien.toString(),
			zadanie: zadanie.toString(),
			 }, function(){
				console.log("wstawionozad");
		});
	//	collection.find({"id":id.toString()}, function(error, cursor){
			//cursor.toArray(function(error,dane){
			//	callback(dane);
				//console.log(dane);
				//res.write(dane);
			//});
		//});
			
});
});
}
//function getTweets(callback){
	//wpisy.find({}, {"limit":10,"sort":{"id": -1}, function(error, cursor){
		//cursor.toArray(function(error, dane){
			//callback(dane);
		//});
//function getUser(1,
//getUser(1, function(dane){
	//console.log(dane);
	function zadania(dzien, callback) {

var dbe = new mongo.Db("portal",new mongo.Server(dbhost, dbport, {}));
dbe.open(function(error){
	console.log("..."+ dbport);
	dbe.collection("zad", function(error, collection){
	   console.log("jest git2");
		//wpist = collection;
	//	collection.insert({
		//	id:"2",
			//login: "in4maticyy",
			//haslo: "ug2014",
			//klasa: "3 inf UG"
			 //}, function(){
			//	console.log("wstawiono");
		//});
		collection.find({"dzien":dzien.toString()}, function(error, cursor){
			cursor.toArray(function(error,zad){
				callback(zad);
				console.log(zad[0]+"ee");
				//res.write(dane);
			//});
		});
			
});
});
});
}
function getUser(login, callback) {

var db = new mongo.Db("portal",new mongo.Server(dbhost, dbport, {}));
db.open(function(error){
	console.log("..."+ dbport);
	db.collection("dany", function(error, collection){
		console.log("jest git");
		wpisy = collection;
	//	collection.insert({
		//	id:"2",
			//login: "in4maticyy",
			//haslo: "ug2014",
			//klasa: "3 inf UG"
			 //}, function(){
			//	console.log("wstawiono");
		//});
		collection.find({"login":login.toString()}, function(error, cursore){
			cursore.toArray(function(error,dany){
				callback(dany);
				//console.log(dane);
				//res.write(dane);
			//});
		});
			
});
});
});
}
