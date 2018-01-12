require('./db/connection.js');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Person = require('./models.js');

const port = process.env.PORT || 3000;

const server = express();
// error status code constants
const STATUS_SERVER_ERROR = 500;
const STATUS_USER_ERROR = 422;

server.use(bodyParser.json());

// Your API will be built out here.
server.get('/users', function(req, res) {
  Person.find().then(function(users) {
    res.status(200).json(users);
  });
});

server.listen(port, () => console.log(`API running`));
