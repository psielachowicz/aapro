var http = require("http");
var host = "127.0.0.1";
var port = 1337;
var server = http.createServer(function (req, res) {
res.writeHead(200, {'Content-Type': 'text/html'});

//res.end("laduje sie");
});
	
server.listen(port, host, function(){
	
});
	
	


var mongo = require("mongodb");
var dbhost = "127.0.0.1";
var dbport = "27017";
var db = new mongo.Db("portal",new mongo.Server(dbhost, dbport, {}));
db.open(function(error){
	console.log("..."+ dbport);
	db.collection("dane", function(error, collection){
		console.log("jest git");
		
	//	collection.insert({
		//	id:"2",
			//login: "in4maticyy",
			//haslo: "ug2014",
			//klasa: "3 inf UG"
			 //}, function(){
			//	console.log("wstawiono");
		//});
		collection.find({"id":"1"}, function(error, cursor){
			cursor.toArray(function(error,dane){
				console.log(dane);
				res.write(dane);
			});
		});
			
});
});
