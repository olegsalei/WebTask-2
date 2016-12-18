var express = require("express");
var bodyParser = require("body-parser");
var compression = require("compression");
var app = express();
var fs = require("fs");
var path = require("path");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function (req, res) {
    res.send("Server is running");
});

app.get('/getJson', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/data.json'));
});

app.post('/addItem', function (req, res) {
    var newData = req.body;
    fs.readFile(__dirname + '/dist/data.json',
        'utf8',
        function (err, data){
            if (err){
                console.log(err);
            } else {
                var obj = JSON.parse(data);
                obj = newData;
                var json = JSON.stringify(obj);
                fs.writeFile(__dirname + '/dist/data.json',
                    json,
                    'utf8',
                    function () { console.log("Added Item"); });
            }});
    res.send({
        status: 200
    });
});

app.post('/deleteItem', function (req, res) {
    var newData = req.body;
    fs.readFile(__dirname + '/dist/data.json',
        'utf8',
        function (err, data){
            if (err){
                console.log(err);
            } else {
                var obj = JSON.parse(data);
                obj = newData;
                var json = JSON.stringify(obj);
                fs.writeFile(__dirname + '/dist/data.json',
                    json,
                    'utf8',
                    function () { console.log("Deleted Item"); });
            }});
    res.send({
        status: 200
    });
});

app.post('/updateItem', function (req, res) {
    var newData = req.body;
    fs.readFile(__dirname + '/dist/data.json',
        'utf8',
        function (err, data){
            if (err){
                console.log(err);
            } else {
                var obj = JSON.parse(data);
                obj = newData;
                var json = JSON.stringify(obj);
                fs.writeFile(__dirname + '/dist/data.json',
                    json,
                    'utf8',
                    function () { console.log("Updated Item"); });
            }});
    res.send({
        status: 200
    });
});

console.log('Server up and running on port 8081');
app.listen(8081);