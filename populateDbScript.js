const Person = require('./models');
const people = require('./people');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const populate = () => {
  const populatePeople = () => {
    const allPeople = people; 
    const promises = allPeople.map(p => new Person(p).save());
    
    return Promise.all(promises);
  };

  return populatePeople()
    .then((err, person) => {
      if (err) {
        throw err;
      } else {
        console.log('person saved');
      }
    });
  };
  populate();