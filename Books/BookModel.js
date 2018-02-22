const mongoose = require('mongoose');

require('../Authors/AuthorModel.js');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }],
  createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Book', BookSchema);
