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

//write a `GET` request to `/users` that simply returns all the people.
server.get('/users', (req, res) => {
  Person.find({}, (err, users) => {
    if (err) {
      res
      .status(STATUS_SERVER_ERROR)
      .json({'something went wrong': err});
      return;
    }
    res.json(users);
  });
});

//write a `GET` request to `/users/:direction` that takes the given string and returns back a list of sorted data alphebetically.
//hint direction can be `asc` or `desc` so in your `.sort()` method you'll have to conditionally check, and we are going to be sorting by user `firstName`
server.get('/users/:direction', (req, res) => {
  const { direction } = req.params;
  Person.find({})
  .sort({'firstName': direction})
  .exec((err, sortedUsers) => {
    if(err) {
      res.status(STATUS_SERVER_ERROR).json({'something went wrong': err});
      return;
    }
    res.json(sortedUsers);
  });
});

//write a `GET` request `/user-get-friends/:id` that returns a single users's friends.
server.get('/user-get-friends/:id', (req, res) => {
  const { id } = req.params;
  Person.findById(id)
  .select('friends')
  .exec((err, friends) => {
    if(err) {
      res.status(STATUS_SERVER_ERROR).json({'something went wrong': err});
      return;
    }
    res.json(friends);
  })
})


//Extra Credit: write a `PUT` that updates a users `firstName` `lastName` 
server.put('/user-update/:id', (req, res) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;
  Person.findByIdAndUpdate(id, {firstName, lastName}, {new: true})
  .exec((err, updatedUser) => {
    if(err) {
      res.status(STATUS_SERVER_ERROR).json({'something went wrong': err});
      return;
    }
    res.json(updatedUser);
  })
})




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
