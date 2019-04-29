var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/'
const express = require('express');
const app = express();
const publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));
var plotly = require('plotly')("slight123", "2NcGLDisE7ryQldFBNCP");



const server = app.listen(7000, () => {
	console.log(`Express running → PORT ${server.address().port}`);
});

MongoClient.connect(url, {useNewUrlParser: true}, function(err, client){
	console.log("Connected");
	var db = client.db('bees');
	var collection = db.collection('BeeData');
	var data = collection.find().toArray(function(err, result) {
		app.get('/data/', (req, res) => {
			res.render('index.ejs', {
				title: 'Data',
				message: 'Shown data as table, navigate to / for visual display',
				hive_data: result
			});
		});
		console.log(result);
		console.log("THIS");

		var dates = [];
		var inTemp = [];
		var outTemp = [];
		var humidity = [];
		console.log("Made it to loop");
		for (var i = 0; i < result.length; i++){
			dates.push(result[i].dateTime);
			humidity.push(result[i].Humidity);
		};
		console.log(dates);
		console.log(humidity);
		var graph_data = [
			{
				x: dates,
				y: humidity,
				type: "scatter"
			}
		];
		var graphOptions = {filename: "date-axes", fileopt: "overwrite"};
		plotly.plot(graph_data, graphOptions, function (err, msg) {
			console.log(msg);
		});


		app.get('/', (req, res) => {
			res.render('graph.ejs', {

			});
		});

	});
	client.close();
});
