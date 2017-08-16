# Mongo II Mini

## Topics To Cover
* Schema Types
  * [String, Number, Buffer, Date, Boolean, Mixed, ObjectId, Array](http://mongoosejs.com/docs/schematypes.html)
* [$ne](https://docs.mongodb.com/v3.2/reference/operator/query/ne/)
* [$and](https://docs.mongodb.com/v3.2/reference/operator/query/and/index.html)
* [$or](https://docs.mongodb.com/v3.2/reference/operator/query/or/index.html)
* [$in](https://docs.mongodb.com/v3.2/reference/operator/query/in/#op._S_in)
* [$gt](https://docs.mongodb.com/v3.2/reference/operator/query/gt/)
* [$sum](https://docs.mongodb.com/v3.2/reference/operator/aggregation/sum/index.html)
* [$orderby](https://docs.mongodb.com/v3.2/reference/operator/meta/orderby/index.html)
* [count](https://docs.mongodb.com/v3.2/reference/command/count/index.html)


## Running the Project

* `cd` into your project directory.
* `npm install` to receive your dependencies.
* fire up your `mongod` server from your root dir or create a `data` dir in this project to store your documents from mongo there. `mongod --dbpath data`.
* To get this project up and running you'll have to start by creating a connection to your mongo server in the `server.js` file. Be sure to use `mongoose.connect` to ensure that you're able to use the `ODM`

### Mongoose Schema
* When you open `models.js` you'll see we've already included your Schema. You're welcome. 
* You'll also notice that this sprint comes with a `people.json` file, and a `populateDbScript.js`. this script will grab those `people` and add them into your db as long as you have your mongo server up and running. 
* RUN: `node populateDbScript.js` get receive all your data.

### Todos:
* write a `GET` request to `/people` that simply returns all the people.
* write a `GET` request to `/people/:sorted` that takes the sorted params object and returns back a list of sorted data alphebetically.
  * hint sorted can be `asc` or `desc` so in your `.sort()` method you'll have to specify what the user wants by pulling that off of the `sorted` param
* lastly write a `PUT` that updates a users name