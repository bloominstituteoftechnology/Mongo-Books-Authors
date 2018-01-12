const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const months = ['january', 'December'];

const PersonSchema = new Schema (
  {
    password: {
      type: String,
      validate: passwordLengthValidator,
      msg: 'Password too short' 
    }, // new
    firstName: {
      type: String,
      required: true,
      index: true, // new
      lowercase: true
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
      type: String, 
      match: /^(mon|tue|wed|thu|fri)day$/i,
      msg: 'No work on weekends!'
    }, // new
    months: { type: String, enum: months } // neww
  },
  { runSettersOnQuery: true }
);

// Customm Validators
function passwordLengthValidator(password) {
  return password.length >= 10;
}

// Virtuals
PersonSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
})

module.exports = mongoose.model('Person', PersonSchema);
