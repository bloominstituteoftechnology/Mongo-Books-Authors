const mongoose = require('mongoose');

const dPath = 'mongodb://localhost/people';

mongoose.Promise = global.Promise; 
mongoose.connect(dbPath, { useMongoClient: true }); 

mongoose.connection.on('connected', function(connection) {
    console.log('Database connected!');
})

mongoose.connection.on('connected', function(connection) {
    console.log('Database connected!');
})

 //disconnected     