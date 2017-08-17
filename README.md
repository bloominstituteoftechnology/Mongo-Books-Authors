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
    2017-08-16T19:57:50.639-0400 I CONTROL  [initandlisten] db version v3.4.7
    2017-08-16T19:57:50.639-0400 I CONTROL  [initandlisten] git version: cf38c1b8a0a8dca4a11737581beafef4fe120bcd
    2017-08-16T19:57:50.639-0400 I CONTROL  [initandlisten] OpenSSL version: OpenSSL 1.0.2l  25 May 2017
    2017-08-16T19:57:50.639-0400 I CONTROL  [initandlisten] allocator: system
    2017-08-16T19:57:50.639-0400 I CONTROL  [initandlisten] modules: none
    2017-08-16T19:57:50.639-0400 I CONTROL  [initandlisten] build environment:
    2017-08-16T19:57:50.639-0400 I CONTROL  [initandlisten]     distarch: x86_64
    2017-08-16T19:57:50.639-0400 I CONTROL  [initandlisten]     target_arch: x86_64
    2017-08-16T19:57:50.639-0400 I CONTROL  [initandlisten] options: { storage: { dbPath: "data" } }
    2017-08-16T19:57:50.639-0400 E NETWORK  [initandlisten] listen(): bind() failed Address already in use for socket: 0.0.0.0
    :27017
    2017-08-16T19:57:50.639-0400 E NETWORK  [initandlisten]   addr already in use
    2017-08-16T19:57:50.639-0400 E NETWORK  [initandlisten] Failed to set up sockets during startup.
    2017-08-16T19:57:50.639-0400 E STORAGE  [initandlisten] Failed to set up listener: InternalError: Failed to set up sockets
    2017-08-16T19:57:50.639-0400 I NETWORK  [initandlisten] shutdown: going to close listening sockets...
    2017-08-16T19:57:50.639-0400 I NETWORK  [initandlisten] shutdown: going to flush diaglog...
    2017-08-16T19:57:50.639-0400 I CONTROL  [initandlisten] now exiting
    2017-08-16T19:57:50.639-0400 I CONTROL  [initandlisten] shutting down with code:48
    5 mixelpix Wed Aug 16 19:57:50$  mongod --dbpath data
    2017-08-16T19:59:25.096-0400 I CONTROL  [initandlisten] MongoDB starting : pid=6280 port=27017 dbpath=data 64-bit host=mix
    elpix.local
    2017-08-16T19:59:25.097-0400 I CONTROL  [initandlisten] db version v3.4.7
    2017-08-16T19:59:25.097-0400 I CONTROL  [initandlisten] git version: cf38c1b8a0a8dca4a11737581beafef4fe120bcd
    2017-08-16T19:59:25.097-0400 I CONTROL  [initandlisten] OpenSSL version: OpenSSL 1.0.2l  25 May 2017
    2017-08-16T19:59:25.097-0400 I CONTROL  [initandlisten] allocator: system
    2017-08-16T19:59:25.097-0400 I CONTROL  [initandlisten] modules: none
    2017-08-16T19:59:25.097-0400 I CONTROL  [initandlisten] build environment:
    2017-08-16T19:59:25.097-0400 I CONTROL  [initandlisten]     distarch: x86_64
    2017-08-16T19:59:25.097-0400 I CONTROL  [initandlisten]     target_arch: x86_64
    2017-08-16T19:59:25.097-0400 I CONTROL  [initandlisten] options: { storage: { dbPath: "data" } }
    2017-08-16T19:59:25.097-0400 E NETWORK  [initandlisten] listen(): bind() failed Address already in use for socket: 0.0.0.0
    :27017
    2017-08-16T19:59:25.097-0400 E NETWORK  [initandlisten]   addr already in use
    2017-08-16T19:59:25.097-0400 E NETWORK  [initandlisten] Failed to set up sockets during startup.
    2017-08-16T19:59:25.097-0400 E STORAGE  [initandlisten] Failed to set up listener: InternalError: Failed to set up sockets
    2017-08-16T19:59:25.097-0400 I NETWORK  [initandlisten] shutdown: going to close listening sockets...
    2017-08-16T19:59:25.097-0400 I NETWORK  [initandlisten] shutdown: going to flush diaglog...
    2017-08-16T19:59:25.097-0400 I CONTROL  [initandlisten] now exiting
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

### Todos:
* write a `GET` request to `/users` that simply returns all the people. - DONE √
* write a `GET` request to `/users/:direction` that takes the given string and returns back a list of sorted data alphebetically.
  * hint sorted can be `asc` or `desc` so in your `.sort()` method you'll have to specify what the user wants by pulling that off of the `sorted` param
* write a `GET` request `/user-get-friends/:id` that returns a single users's friends.
### Extra Credit:
* lastly write a `PUT` that updates a users `firstName` `lastName`
