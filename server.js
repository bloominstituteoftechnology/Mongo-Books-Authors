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

server.get('/users', (req, res) => {
  Person.find({}, (err, people) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR).json({error: err});
    } 
    res.json(people);
  });
});

server.get('/users/:direction', (req, res) => {
  let { direction } = req.params;
  if (direction !== 'asc' && direction !== 'desc'){
    res.status(STATUS_USER_ERROR).json({error: 'you must provide a valid sort order'});
  }
  Person.find({})
    .sort({ firstName: direction })
    .exec((err, people) => {
      if (err) {
        res.status(STATUS_SERVER_ERROR).json({ error: err});
      }
      res.json(people);
    });
});

server.get('/user-get-friends/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(STATUS_USER_ERROR).json({error: 'you must provide a valid id'});
  }
  Person.findById(id)
    .select('friends')
    .exec((err, friends) => {
      if (err) {
        res.status(STATUS_SERVER_ERROR).json({ error: err });
      }
      res.json(friends);
  });
});

server.put('/users', (req, res) => {
  const { id, firstName, lastName } = req.body;
  if (!id) {
    res.status(STATUS_USER_ERROR).json({error: 'you must provide a valid id'});
  }
  if (!firstName) {
    res.status(STATUS_USER_ERROR).json({error: 'you must provide a valid firstName'});
    return;
  }
  if (!lastName) {
    res.status(STATUS_USER_ERROR).json({error: 'you must provide a valid lastName'});
  }
  Person.findByIdAndUpdate(id, 
    {$set: {firstName, lastName}}, 
    {new:true}, 
    (err, person) => {
      if (err) {
        res.status(STATUS_SERVER_ERROR).json({ error: err });
      }
      res.json(person);
  });
});

mongoose.Promise = global.Promise;
const connect = mongoose.connect('mongodb://localhost:27017/people', {
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
