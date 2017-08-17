# Mongo II Mini

## Topics To Cover
* Schema Types - OKAY √
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

* `cd` into your project directory. - OKAY √
* `npm install` to receive your dependencies. -DONE √
  ```console
  $  npm i
      npm WARN LS-Mongo-II-Mini@1.0.0 No repository field.

      added 79 packages in 7.856s
  ```

* fire up your `mongod` server from your root dir or - NOPE √
* create a `data` dir in this project to store your documents from mongo there. `mongod --dbpath data`. - DONE √
```console
  $  mkdir data
  $  mongod --dbpath data
    2017-08-16T19:57:50.638-0400 I CONTROL  [initandlisten] MongoDB starting : pid=6244 port=27017 dbpath=data 64-bit host=mixelpix.local
    ...
    2017-08-16T19:57:50.639-0400 E NETWORK  [initandlisten]   addr already in use
    ...
    2017-08-16T19:59:25.097-0400 I CONTROL  [initandlisten] shutting down with code:48
```
  * I restarted my computer and now the mongo server is running :D

### Mongoose Schema
* When you open `models.js` you'll see we've already included your Schema. You're welcome. - THANKS √
* You'll also notice that this sprint comes with a `people.json` file, and a `populateDbScript.js`. this script will grab those `people` and add them into your db as long as you have your mongo server up and running. - OKAY √
* RUN: `node populateDbScript.js` get receive all your data. - DONE √
```console
$  node populateDbScript.js
    done
```

* launch server: `nodemon server.js` - DONE √

### Todos:
* write a `GET` request to `/users` that simply returns all the people. - DONE √
* write a `GET` request to `/users/:direction` that takes the given string and returns back a list of sorted data alphebetically. - OKAY √
  * hint "direction" can be `asc` or `desc` so in your `.sort()` method you'll have to conditionally check `asc` for ascending or `desc` for descending according to the user `firstName`... specify what the user wants by pulling that off of the `sorted` param - OKAY (deal with conditional inside find().sort().exec()) - DONE √
* write a `GET` request `/user-get-friends/:id` that returns a single users's friends. - DONE √
### Extra Credit:
* lastly write a `PUT` that updates a users `firstName` & `lastName` - DONE √
