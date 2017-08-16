const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
// import your models here to use throught your API
const app = express();

// error status code constants
const STATUS_SERVER_ERROR = 500;
const STATUS_USER_ERROR = 422;

app.use(bodyParser.json());

// Your API will be built out here.

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
