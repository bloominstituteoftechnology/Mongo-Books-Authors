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
    if(err) {
      res.status(STATUS_SERVER_ERROR).json({'Error': err });
      return;
    }
    res.json(users);
  });
});


server.get('/users/:direction', (req, res) => {
  const { direction } = req.params;
  Person.find({}).sort({ firstName: direction}).exec((err, users) => {
      if(err) {
        res.status(STATUS_USER_ERROR).json({ 'Error': err });
        return;
      }
      res.json(users);
  });
});


server.get('/user-get-friends/:id', (req, res) => {
  const { id } = req.params;
  if( !id ) {
    res.status(STATUS_USER_ERROR).json({ 'Error' : 'You need to supply an id'});
    return;
  }
  Person.findOne({ _id: id }, (err, user) => {
    if(err) {
      res.status(STATUS_USER_ERROR).json({ 'Error': err});
      return;
    }
    res.json(user.friends);
  })
});


server.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;
  const values = { firstName, lastName };

  const updateBody = Object.keys(values).filter(key => values[key] !== undefined)
  .reduce((updateBody, key) => {
    updateBody[key] = values[key];
    return updateBody;
  }, {});




  Person.findOneAndUpdate({ _id: id}, updateBody, { new: true}, (err, user) => {
    if(err) {
      res.status(422).json({ errors: [err]});
      return;
    }
    res.status(200).json({ user });
    return;
  });
  console.log('test');
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
