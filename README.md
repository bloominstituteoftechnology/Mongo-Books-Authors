# Mongo-Books-Authors

## Topics To Cover

- relationships
- queries


## Running the Project

* `cd` into your project directory.
* `npm install` to receive your dependencies.
* fire up your `mongod` server.

### Mongoose Schema
* We've provided models for Authors and Books. 
* RUN: `node populateDb.js` get add sample data to your database.

### Todos:
* write a endpoints to get the Books information and _populate_ the author information for each book.
* write a `GET` request to `/users/:direction` that takes the given string and returns back a list of sorted data alphebetically.
  * hint direction can be `asc` or `desc` so in your `.sort()` method you'll have to conditionally check, and we are going to be sorting by user `firstName`
* write a `GET` request `/user-get-friends/:id` that returns a single users's friends.
### Extra Credit: 
* lastly write a `PUT` that updates a users `firstName` `lastName` 
