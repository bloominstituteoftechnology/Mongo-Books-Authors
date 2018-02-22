const mongoose = require('mongoose');

const Author = require('./Authors/AuthorModel.js');
const Book = require('./Books/BookModel.js');

mongoose
  .connect('mongodb://localhost/cs6')
  .then(db => {
    const authors = [
      {
        _id: '5a57017f289f07518cea6707',
        firstName: 'Pramod',
        lastName: 'Sadalage',
      },
      {
        _id: '5a57018a289f07518cea6708',
        firstName: 'Martin',
        lastName: 'Fowler',
      },
      {
        _id: '5a570195289f07518cea6709',
        firstName: 'Robert',
        lastName: 'Martin',
      },
      {
        _id: '5a5701ab289f07518cea670a',
        firstName: 'Kent',
        lastName: 'Beck',
      },
      {
        _id: '5a5701bc289f07518cea670b',
        firstName: 'Kendall',
        lastName: 'Scott',
      },
      {
        _id: '5a5701cd289f07518cea670c',
        firstName: 'Shane',
        lastName: 'Harvie',
      },
      {
        _id: '5a5701d8289f07518cea670d',
        firstName: 'Jay',
        lastName: 'Fields',
      },
      {
        _id: '5a5701e9289f07518cea670e',
        firstName: 'John',
        lastName: 'Brant',
      },
      {
        _id: '5a5701f6289f07518cea670f',
        firstName: 'Don',
        lastName: 'Roberts',
      },
      {
        _id: '5a570204289f07518cea6710',
        firstName: 'William',
        lastName: 'Opdyke',
      },
      {
        _id: '5a57b57bfdb7d8451cb2c063',
        firstName: 'Luis',
        lastName: 'Hernandez',
      },
    ];

    const books = [
      {
        authors: ['5a57018a289f07518cea6708'],
        _id: '5a57032b806fd22784b10b83',
        title: 'Analysis Patterns: Reusable Object Models',
        genre: 'Techology',
      },
      {
        authors: ['5a57018a289f07518cea6708'],
        _id: '5a57033f806fd22784b10b84',
        title: 'Domain Specific Languages',
        genre: 'Techology',
      },
      {
        authors: ['5a57018a289f07518cea6708'],
        _id: '5a570362806fd22784b10b85',
        title:
          'UML Distilled: A Brief Guide to the Standard Object Modeling Language, Third Edition',
        genre: 'Techology',
      },
      {
        authors: ['5a57018a289f07518cea6708'],
        _id: '5a570372806fd22784b10b86',
        title: 'Patterns of Enterprise Architecture',
        genre: 'Techology',
      },
      {
        authors: ['5a57018a289f07518cea6708', '5a57017f289f07518cea6707'],
        _id: '5a5703ad806fd22784b10b87',
        title:
          'NoSQL Distilled: A Brief Guide to the Emerging World of Polyglot Persistence',
        genre: 'Technology',
      },
      {
        authors: ['5a57018a289f07518cea6708', '5a5701ab289f07518cea670a'],
        _id: '5a5703dd806fd22784b10b88',
        title: 'Planning Extreme Programming',
        genre: 'Technology',
      },
      {
        authors: [
          '5a57018a289f07518cea6708',
          '5a5701f6289f07518cea670f',
          '5a570204289f07518cea6710',
          '5a5701ab289f07518cea670a',
          '5a5701e9289f07518cea670e',
        ],
        _id: '5a57043b806fd22784b10b89',
        title: 'Refactoring: Improving the Design of Existing Code',
        genre: 'Technology',
      },
      {
        authors: ['5a5701ab289f07518cea670a'],
        _id: '5a577fe44abbc03d9cf4d83c',
        title: 'Implementation Patterns',
        genre: 'Technology',
      },
    ];

    Author.create(authors)
      .then(docs => {
        console.log('authors added');
        Book.create(books)
          .then(docs => {
            console.log('books added');
            mongoose.disconnect();
          });
      })
      .catch(error => {
        mongoose.disconnect();
      });
  })
  .catch(error => console.log('could not connect'));
