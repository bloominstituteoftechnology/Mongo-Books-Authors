const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    index: true,
  },
  lastName: {
    type: String,
    required: true,
    index: true,
  },
  createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Author', AuthorSchema);
