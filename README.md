# Mongo II Mini

## Topics To Cover
* Advanced Mongoose queries
* 


## Running the Project

* `cd` into your project directory.
* `npm install` to receive your dependencies.
* fire up your `mongod` server from your root dir or create a `data` dir in this project to store your documents from mongo there. `mongod --dbpath data`.
* To get this project up and running you'll have to start by creating a connection to your mongo server in the `server.js` file. Be sure to use `mongoose.connect` to ensure that you're able to use the `ODM`

```
// your code can look something like this. We'll be dealing with blogposts in this sprint so name your collection posts.
const connect = mongoose.connect(
  '<pass-your-mongo-string-here>',
  { useMongoClient: true }
);

// if you've done this right, and your `mongod` server is running you should be able to start your node server now and see it connect.

```
