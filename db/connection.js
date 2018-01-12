const mongoose = require('mongoose');

const dbPath = 'mongodb://localhost/people';

mongoose.Promise = global.Promise;
mongoose.connect(dbPath, { useMongoClient: true });

mongoose.connection.on('connected', function(connection) {
  console.log('Database connected!');
})

mongoose.connection.on('error', function(error) {
  console.log('Database connection failed!');
})