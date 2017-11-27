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
server.get('/user', (req, res) => {
  Person.find().exec((err, person) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
    } else {
      res.status(200).json(person);
    }
  });
});

server.get('/user/:direction', (req, res) => {
  const direction = req.params.direction;
  Person.find()
    .sort({ firstName: direction })
    .exec((err, person) => {
      if (err) {
        res.status(STATUS_SERVER_ERROR);
      } else {
        res.status(200).json(person);
      }
    });
});

server.get('/user-get-friends/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  Person.find({ _id: id })
    .select('friends')
    .exec((err, person) => {
      if (err) {
        res.status(STATUS_SERVER_ERROR);
      } else {
        console.log(person);
        res.status(200).json(person);
      }
    });
});

server.put('/user-update', (req, res) => {
  Person.updateOne(req.body, { $set: { firstName: 'aaaaa' } }).exec((err, person) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
    } else {
      console.log(person);
      res.status(200).json(person);
    }
  });
});

mongoose.Promise = global.Promise;
const connect = mongoose.connect('mongodb://localhost/people', {
  useMongoClient: true,
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
