"use strict";

var express = require('express');

var app = express();

var cors = require('cors');

var bodyParser = require('body-parser');

var mysql = require('mysql2');

var port = 3000;
var hostname = 'localhost';
var db = "nodeDb";
var tbl = "users";
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
var corsOptions = {
  origin: '*',
  methods: "GET",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204

}; // MySQl connection

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: db
}); // Connect with MySql

connection.connect(function (err) {
  if (err) throw err;
  console.log("MySql Connected");
}); // Create Database
// connection.query("Create Database nodeDb", function (err, result) {
//     if (err) throw err;
//     console.log("Result: " + result);
// });
// Create Database
// connection.query("Create Database nodeDb", function (err, result) {
//     if (err) throw err;
//     console.log("Result: " + result);
// });
// routes

app.get('/', function (req, res) {
  // Display all data
  res.status(200);
  res.setHeader('Content-Type', 'application/json');
  connection.query("SELECT * from " + tbl, function (err, result) {
    if (err) throw err;
    console.log("Result: " + JSON.stringify(result));
    res.end(JSON.stringify(result));
  });
});
app.post('/new', function (req, res) {
  res.status(200);
  res.setHeader('Content-Type', 'application/json'); // console.log(req.body)

  var resp = req.body;
  console.log(resp['id']);
  connection.query("INSERT into " + tbl + " VALUES (" + resp['id'] + ",\'" + resp['name'] + "\',\'" + resp['email'] + "\',\'" + resp['item'] + "\'," + resp['amount'] + ",\'" + resp['status'] + "\')", function (err, result) {
    if (err) throw err;
    console.log("Result: " + JSON.stringify(result));
    res.end(JSON.stringify(result));
  });
});
app.post('/update', function (req, res) {
  res.status(200);
  res.setHeader('Content-Type', 'application/json'); // console.log(req.body)

  var resp = req.body;
  console.log(resp['id']);
  connection.query("UPDATE " + tbl + " SET name= \'" + resp['name'] + "\', email=\'" + resp['email'] + "\',item=\'" + resp['item'] + "\',amount=" + resp['amount'] + ",status=\'" + resp['status'] + "\' where id = " + resp['id'], function (err, result) {
    if (err) throw err;
    console.log("Result: " + JSON.stringify(result));
    res.end(JSON.stringify(result));
  });
});
app.post('/search', function (req, res) {
  // Display all data
  res.status(200);
  res.setHeader('Content-Type', 'application/json');
  var getStatus = req.body;
  connection.query("SELECT * from " + tbl + " where status = \'" + getStatus['status'] + "\'", function (err, result) {
    if (err) throw err;
    console.log("Result: " + JSON.stringify(result));
    res.end(JSON.stringify(result));
  });
});
app.post('/delete', function (req, res) {
  res.status(200);
  res.setHeader('Content-Type', 'application/json');
  var delId = req.body['delID'];
  connection.query("DELETE from " + tbl + " where id = " + delId, function (err, result) {
    if (err) throw err;
    console.log("Result: " + JSON.stringify(result));
    res.end(JSON.stringify(result));
  });
});
app.get('/*', function (req, res) {
  res.status(404);
  res.end("<h1>404 Error</h1>");
}); // Http connection

app.listen(port, hostname, function () {
  console.log("App listening at http://".concat(hostname, ":").concat(port));
});