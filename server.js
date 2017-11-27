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
  Person.find({}, (err, users) => {
    if (err) {
      res.status(500).json({ 'Error getting your users: ': err});
      return;
    }
    res.json(users);
  });
});

server.get('/users/:direction', (req, res) => {
  const { direction } = req.params;
  Person
  .find({})
  .sort({ "firstName": direction })
  .exec((err, sortedUsers) => {
    if (err) {
      res.status(422).json({ 'Error getting sorting your users: ': err});
      return;
    }
    res.json(sortedUsers);
  });
});

server.get('/user-get-friends/:id', (req, res) => {
  const { id } = req.params;
  Person.findById(id)
    .select('friends')
    .exec((err, friends) => {
      if (err) {
        res.status(422).json({ 'Could not find user by that id: ': err});
        return;
      }
      res.json(friends);
    });
});

server.put('/users/:id', (req, res) => {
  const { firstName, lastName, id } = req.params;
  Person.findByIdAndUpdate(id, {firstName, lastName}, { new: true })
  .exec((err, updatedUser) => {
    if (err) {
      res.status(422).json({ 'Could not find user by that id: ': err});
      return;
    }
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
