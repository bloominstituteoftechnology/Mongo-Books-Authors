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

### Mongoose Schema
* If you open the `models.js` file you'll see the object your building for. 
* This will be a common pattern you'll see in your future endeavors i.e. You get a list of requirements for your data set, and build towards that. Or.. sometimes you just aren't that lucky and you've got to do this on your own.
* Lets build out our schema. Start by listing the Schema types you'll need for this file. 