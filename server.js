var express = require('express');
var firebase = require('firebase');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json()); //need to parse HTTP request body

var config = {
	apiKey: "AIzaSyC3ctiaCtXhJ-cfQWrReQMnBrmSgx3_8gc",
    authDomain: "androidserver-252200.firebaseapp.com",
    databaseURL: "https://androidserver-252200.firebaseio.com",
    projectId: "androidserver-252200",
    storageBucket: "",
    messagingSenderId: "904571509435",
    appId: "1:904571509435:web:61b63c42e85a2092f1679e"

};
firebase.initializeApp(config);
  

//Fetch instances
app.get('/api/disco', function (req, res) {

	console.log(req.query.Disc);
	var userReference = firebase.database().ref("/Disco/"+ req.query.Disc);

	//Attach an asynchronous callback to read the data
	userReference.on("value", 
			  function(snapshot) {
					console.log(snapshot.val());
					res.json(snapshot.val());
					userReference.off("value");
					}, 
			  function (errorObject) {
					console.log("The read failed: " + errorObject.code);
					res.send("The read failed: " + errorObject.code);
			 });
});

app.get('/api/todos', function (req, res) {

	console.log(req.query.Disc);
	var userReference = firebase.database().ref("/Disco/");

	//Attach an asynchronous callback to read the data
	userReference.on("value", 
			  function(snapshot) {
					console.log(snapshot.val());
					res.json(snapshot.val());
					userReference.off("value");
					}, 
			  function (errorObject) {
					console.log("The read failed: " + errorObject.code);
					res.send("The read failed: " + errorObject.code);
			 });
});

app.post('/api/post', function (req, res) {
res.send("dfs");
	console.log("HTTP Put Request");
});

//Create new instance
app.post('/api/nuevo', function (req, res) {

	console.log("HTTP Put Request");

	var name = req.body.Nombre;
	var band = req.body.Banda;
  var year = req.body.Ano;
  var genre = req.body.Genero;

	var referencePath = '/Disco/'+name+ '/';
	var userReference = firebase.database().ref(referencePath);
	userReference.set({Nombre: name,Banda: band, Ano: year, Genero : genre}, 
				 function(error) {
					if (error) {
            res.send("Data could not be saved." + error);
            console.log(error);
					} 
					else {
						res.send({Mensaje: "Exito"});
					}
			});
});




var server = app.listen(8080, function () {
  
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port);
});