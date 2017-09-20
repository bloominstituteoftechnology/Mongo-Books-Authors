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

// `GET` request to `/users` that simply returns all the people.
app.get('/users', (req, res) => {
  Person.find()
    .then(users => res.json(users.reduce((obj, user) => {
      obj[user.id] = user;
      return obj;
    }, {})))
    .catch(error => res.status(STATUS_SERVER_ERROR).json({ error }))
})

// `GET` request to `/users/:direction` that takes the
// given string and returns back a list of sorted data alphebetically.
app.get('/users/:direction', (req, res) => {
  Person.find()
    .sort(req.params.direction.toLowerCase() === 'desc'
      ? '-firstName'
      : 'firstName'
    )
    .then(users => res.json(users.reduce((obj, user) => {
      obj[user.id] = user;
      return obj;
    }, {})))
    .catch(error => res.status(STATUS_SERVER_ERROR).json({ error }))
})


// `GET` request `/user-get-friends/:id`
// that returns a single users's friends.
app.get('/user-get-friends/:id', (req, res) => {
  Person.findById(req.params.id)
    .then(user => res.json(user.friends.reduce((obj, friend, index) => {
      obj.friends[index] = friend;
      return obj
    }, {
      firstName: user.firstName,
      lastName: user.lastName,
      friends: {}
    })))
    .catch(error => res.status(STATUS_SERVER_ERROR).json({ error }))
})


// ### Extra Credit: 
// `PUT` that updates a users `firstName` `lastName` 
app.put('/user-update/:id', (req, res) => {
    const { firstName, lastName } = req.body;
    if (!firstName || !lastName) {
      return res.status(STATUS_USER_ERROR).json({
        error: {
          message: 'A firstName and lastName must be included in the request',
          missingFields: [
            !firstName ? 'firstName' : null,
            !lastName ? 'lastName' : null 
          ].filter(nn => nn)
        }
      })
    }
  Person.findById(req.params.id)
    .then(user => {
      user.firstName = firstName;
      user.lastName = lastName;
      user.save()
        .then(user => res.json(user))
        .catch(error => res.status(STATUS_SERVER_ERROR).json({ error }))
    })  
    .catch(error => res.status(STATUS_SERVER_ERROR).json({ error }))
})


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
