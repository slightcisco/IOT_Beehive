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

    UpdateTable(client);
    console.log(client);
    console.log("THIS IS ALSO IT");

    app.get('/', (req, res) => {

        console.log(client);
        console.log("THIS IS IT");
        UpdateTable(client);
        res.render('graph.ejs', {

        });
    });

});


function UpdateTable(client){
    var db = client.db('bees');
    var collection = db.collection('BeeData');
    var data = collection.find().toArray(function(err, result) {

        console.log(result);
        console.log("THIS |");

        var dates = [];
        var inTemp = [];
        var outTemp = [];
        var humidity = [];
        for (var i = 0; i < result.length; i++){
            dates.push(result[i].dateTime);
            humidity.push(result[i].Humidity);
            inTemp.push(result[i].inTemp);
            outTemp.push(result[i].outTemp);
        };
        console.log(dates);
        console.log(humidity);
        console.log(inTemp);
        console.log(outTemp);
        var humidity_trace = 
            {
                x: dates,
                y: humidity,
                name: "Humidity"
            };
        var inTemp_trace = 
            {
                x: dates,
                y: inTemp,
                name: "Inside Temp"
            };
        var outTemp_trace = 
            {
                x: dates,
                y: outTemp,
                name: "Outside Temp"
            };

        graph_data = [humidity_trace, inTemp_trace, outTemp_trace];

        var graphOptions = {filename: "date-axes", fileopt: "overwrite"};
        plotly.plot(graph_data, graphOptions, function (err, msg) {
            console.log(msg);
        });

        app.get('/data/', (req, res) => {
            res.render('index.ejs', {
                title: 'Data',
                message: 'Shown data as table, navigate to / for visual display',
                hive_data: result
            });
        });

    });
}
