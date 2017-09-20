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

// Your API will be built out here.

app.get('/users', (req, res) => {
  Person.find().exec((err, users) => {
    if (err) {
      res.status(500).send({ error: 'Server error looking for the people.' });
      return;
    }
    res.json(users);
  })
});

app.get('/users/:direction', (req, res) => {
  const { direction } = req.params;
  Person.find()
    .sort({ 'firstName': direction })
    .exec((err, users) => {
      if (err) {
        res.status(500).send({ error: 'Server error looking for the people.' });
        return;
      }
      res.json(users);
    });
});

app.get('/user-get-friends/:id', (req, res) => {
  const { id } = req.params;
  Person.findById(id)
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ error: 'Server error looking for the people.' });
        return;
      }
      res.json(user.friends);
    });
});

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  Person.findByIdAndUpdate(id, 
    { $set: req.body }, 
    { new:true, safe:true, upsert:true }, 
    (err, response) => {
      if (err) {
        res.status(500).send({ error: 'Server error looking for the people.' });
        return;
      }
      res.json(response);
    })
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
