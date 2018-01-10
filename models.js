const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const months = ['january', 'December'];

const PersonSchema = new Schema(
  {
    password: {
      // new
      type: String,
      validate: passwordLengthValidator,
      msg: 'Password too short',
    },
    firstName: {
      type: String,
      required: true,
      index: true, // new
      lowercase: true, // new
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // creates an index automatically
    },
    friends: [],
    age: { type: Number, min: 0, max: 150 }, // new
    gender: String,
    location: String,
    dateOfBirth: Date,
    workDay: {
      // new
      type: String,
      match: /^(mon|tues|wednes|thur|fri)day$/i,
      msg: 'No work on weekends!',
    }, // new
    months: { type: String, enum: months },
  }, // new
  { runSettersOnQuery: true }
); // new

// Custom Validators
function passwordLengthValidator(password) {
  return password.length >= 10;
}

// Virtuals
// user.fullName
PersonSchema.virtual('fullName')
  .get(function() {
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function(name) {
    this.first = name.split(' ')[0];
    this.last = name.split(' ')[1];
  });
  .put(function() {
    return '${this.firstName} ${this.lastName}';
  })
  

  // two types of indexes: 
  // - path level: index: true
  // - schema level: used for compound indexes
  PersonSchema.index({ firstName: 1, lastName: 1});

// PersonSchema.pre('save', function(val) {
//   // grab the property you want
//   // grab only the numbers using regex
//   // based on country or the length choose a format
//   // rewrite it to the format you want
//   // return the formatterd number
// })

// filter.name === collection.name

// User.create([{}, {}]).then() // const user = new User() + user.save()

module.exports = mongoose.model('Person', PersonSchema);
