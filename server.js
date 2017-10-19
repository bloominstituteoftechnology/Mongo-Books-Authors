/* ====== IMPORT ====== */

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Person = require('./models.js');

/* ====== ERROR CONSTANTS ====== */

const STATUS_SERVER_ERROR = 500;
const STATUS_USER_ERROR = 422;

/* ====== INITIALIZE ====== */

const port = process.env.PORT || 3000;

const server = express();

server.use(bodyParser.json());

mongoose.Promise = global.Promise;
const connect = mongoose.connect('mongodb://localhost/people', {
  useMongoClient: true
});

/* ====== GET ROUTES ====== */

server.get('/', (req, res) => res.redirect(307, '/users'));
server.get('/user-get-friends/:id', (req, res) => res.redirect(307, `/user/${req.params.id}/friends`));

server.get('/user', (req, res) => handleUserError('You must specify a User', res));
server.get('/user/:id', (req, res) => getUser(req.params.id, res));
server.get('/users', (req, res) => getUsers(res));

server.get('/users/:direction', (req, res) => {
  const direction = req.params.direction.toLowerCase();
  getUsers((err, users) => {
    if (users == null || !Array.isArray(users) || users.length === 0)
      return sayNothingToSee(res);
    if (direction !== 'asc' && direction !== 'desc')
      return res.redirect(307, '/users');
    users = users.sort((user1, user2) => {
      if (user1.firstName.toLowerCase() > user2.firstName.toLowerCase())
        return direction === 'asc' ? 1 : -1;
      if (user1.firstName.toLowerCase() < user2.firstName.toLowerCase())
        return direction === 'asc' ? -1 : 1;
      return 0;
    });
    res.send({friends: users});
  });
});

server.get('/user/:id/friends', (req, res) => {
  getUser(req.params.id, (err, user) => {
    if (user == null)
      return sayUserNotFound(res);
    if (!Array.isArray(user.friends) || user.friends.length === 0)
      return handleUserError('This person has no friends... Are you looking yourself up online again?' ,res);
    res.send({friends: user.friends});
  });
});

/* ====== PUT ROUTES ====== */

server.put('/user/:id', (req, res) => {
  const { firstName, lastName, email } = req.body;
  getUser(req.params.id, (err, user) => {
    if (user == null)
      return sayUserNotFound(res);
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.save((err) => {
      if (err)
        return res.send(err);
      res.send(user);
    });
  })
});

/* ====== HELPERS ====== */

const getUser = (id, cb, res) => {
  if (cb == null && res == null)
    throw new Error('Error: Invalid arguments passed to getUser');
  if (typeof cb !== 'function') {
    if (cb != null && cb.constructor.name === 'ServerResponse')
      [cb, res] = [null, cb]
    else if (res != null && res.constructor.name !== 'ServerResponse')
      throw new Error(
        'Error: You need to pass a ServerResponse object into getUser ' +
        'if you do not provide a callback function.\n'+
        'example: getUser(userID, null, res) or getUser(userID, res)'
      );
  }
  if (cb == null)
    cb = (err, user) => {
      if (user != null)
        return res.send(user);
      sayUserNotFound(res);
    };
  if (typeof cb !== 'function' || (typeof cb !== 'function' && res.constructor.name !== 'ServerResponse'))
    throw new Error('Error: Invalid argument types passed into getUser. ' +
        'Make sure you are providing the function with (userID, <function>/<ServerResponse>) ' +
        'or (userID, <function>/~null, <ServerResponse>'
      );
  Person.findOne().where('_id').equals(id).exec(cb);
}

const getUsers = (cb, res) => {
  if (cb == null && res == null)
    throw new Error('Error: Invalid arguments passed to getUsers');
  if (typeof cb !== 'function') {
    if (cb != null && cb.constructor.name === 'ServerResponse')
      [cb, res] = [null, cb]
    else if (res != null && res.constructor.name !== 'ServerResponse')
      throw new Error(
        'Error: You need to pass a ServerResponse object into getUsers ' +
        'if you do not provide a callback function.\n'+
        'example: getUsers(null, res) or getUsers(res)'
      );
  }
  if (cb == null)
    cb = (err, users = []) => {
      if (Array.isArray(users) && users.length > 0)
        return res.send({users});
      sayNothingToSee(res);
    };
  if (typeof cb !== 'function' || (typeof cb !== 'function' && res.constructor.name !== 'ServerResponse'))
    throw new Error('Error: Invalid argument types passed into getUser. ' +
        'Make sure you are providing the function with (userID, <function>/<ServerResponse>) ' +
        'or (userID, <function>/~null, <ServerResponse>'
      );
  Person.find().exec(cb);
}

const handleUserError = (message, res) => {
  if (typeof message !== 'object' || Array.isArray(message))
    message = {error: message};
  res.status(STATUS_USER_ERROR).send(message);
};

const sayUserNotFound = res => handleUserError("Sorry, couldn't locate your friend that you totally have.", res);
const sayNothingToSee = res => handleUserError('Nope. Nothing to see here.', res);

/* ====== START APP ====== */

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
