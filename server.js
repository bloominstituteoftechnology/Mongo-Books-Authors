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

server.get('/users', (req, res) => {
  Person.find({}, (err, people) => {
    if (err) return res.status(STATUS_SERVER_ERROR).json(err);
    res.json(people);
  });
});

server.get('/users/:direction', (req, res) => {
  const { direction } = req.params;
  Person.find({}, (err) => {
    if (err) { return res.status(STATUS_USER_ERROR).json(err);}
  }).sort({"firstName": direction});
});

server.get('/user-get-friends/:id', (req, res) => {
  const { id } = req.params;
  Person.findById(id, (err, found) => {
    if (err) return res.status(STATUS_USER_ERROR).json(err);
    res.json(found.friends);
  });
});

server.put('/update/', (req, res) => {
  const { id, firstName, lastName} = req.body;
  Person.findByIdAndUpdate( id, { $set: {firstName, lastName}}, {new: true}, (err, updatedUser) => {
    if (err) return res.status(STATUS_USER_ERROR).json(err);
    res.json(updatedUser);   
  });
});

mongoose.Promise = global.Promise;
const connect = mongoose.connect('mongodb://localhost/people', {
  useMongoClient: true
});
/* eslint no-console: 0 */
connect.then(
  () => {
    server.listen(port);
    console.log(`Server Listening on ${port}`);
  },
  err => {
    console.log('\n************************');
    console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
    console.log('************************\n');
  }
);
