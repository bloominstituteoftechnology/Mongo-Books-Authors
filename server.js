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

// app.get('/users', (req, res) => {
//   // we call the people collection by accessing the person Model
//   Person.find({}, (err, users) => {
//     // find({}) all 'users' that exist there at people
//     if (err) {
//       // send back the error via status code and a json version of the actual error
//       res.status(STATUS_SERVER_ERROR);
//       res.json({error: err});
//     } else {
//       // if the request was good and we're up and running..
//       // send back all documents (people objects 'users') at people collection
//       res.json(users);
//     }
//   });
// });

app.get('/users', (req, res) => {
  Person.find({}, (err, users) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json({ error: err });
    } else {
      res.json(users)
    }
  });
});

app.get('/users/:direction', (req, res) => {
  const { direction } = req.params;
  // console.log("Direction to sort by: ", direction);
  Person.find({})
  .sort({ firstName: direction })
  .exec((err, users) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json({ error: err });
    } else {
      res.json(users);
    }
  });
});

app.get('/user-get-friends/:id', (req, res) => {
  const { id } = req.params;
  Person.findById(id, (err, user) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json({ error: `There is no record of the id: ${err.value}.` });
    } else {
      res.json(user.friends);
    }
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
