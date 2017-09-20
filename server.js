const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Person = require('./models.js');

const port = process.env.PORT || 3000;

const app = express();

// error status code constants
const STATUS_SERVER_ERROR = 500;
const STATUS_USER_ERROR = 422;

app.use(bodyParser.json());

app.get('/users', (req, res) => {
  Person.find({}, (err, people) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json({ error: err });
      return;
    }
    res.json(people);
  });
});

app.get('/users/:direction', (req, res) => {
  let { direction } = req.params;
  if (direction === 'asc') direction = 1;
  if (direction === 'desc') direction = -1;
  Person.find({})
    .sort({ firstName: direction })
    .exec((err, people) => {
      if (err) {
        res.status(STATUS_SERVER_ERROR);
        res.json({ error: err});
        return;
      }
      res.json(people);
    });
});

app.get('/user-get-friends/:id', (req, res) => {
  const { id } = req.params;
  Person.findById(id, (err, person) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json({ error: err });
      return;
    }
    res.json(person.friends);
  });
});

app.put('/users', (req, res) => {
  const { id, firstName, lastName } = req.body;
  Person.findById(id)
    .update({firstName, lastName})
    .exec((err, person) => {
      if (err) {
        res.status(STATUS_SERVER_ERROR);
        res.json({ error: err });
        return;
      }
      res.json(person);
    });
});

mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/people',
  { useMongoClient: true }
);
/* eslint no-console: 0 */
connect.then(() => {
  app.listen(port);
  console.log(`Server Listening on ${port}`);
}, (err) => {
  console.log('\n************************');
  console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
  console.log('************************\n');
});
