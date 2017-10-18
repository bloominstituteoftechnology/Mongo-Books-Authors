const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Person = require("./models.js");

const port = process.env.PORT || 3000;

const server = express();

// error status code constants
const STATUS_SERVER_ERROR = 500;
const STATUS_USER_ERROR = 422;

server.use(bodyParser.json());

// Your API will be built out here.
server.get("/users", async (req, res) => {
  try {
    const users = await Person.find();
    return res.json(users);
  } catch (error) {
    return res
      .status(STATUS_SERVER_ERROR)
      .json({ Error: "Something went wrong on the server" });
  }
});

server.get("/users/:direction", async (req, res) => {
  const { direction } = req.params;
  try {
    const people = await Person.find().sort({
      firstName: direction
    });
    return res.json(people);
  } catch (error) {
    return res
      .status(STATUS_SERVER_ERROR)
      .json({ Error: "Something went wrong on the server" });
  }
});

server.get("/user-get-friends/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const userFriends = await Person.findById(id).select("friends");
    return res.json(userFriends);
  } catch (error) {
    return res
      .status(STATUS_SERVER_ERROR)
      .json({ Error: "Something went wrong on the server" });
  }
});

server.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;
  try {
    const user = await Person.findByIdAndUpdate(
      id,
      {
        $set: { firstName, lastName }
      },
      { new: true }
    );
    return res.json(user);
  } catch (error) {
    return res
      .status(STATUS_SERVER_ERROR)
      .json({ Error: "Something went wrong on the server" });
  }
});

mongoose.Promise = global.Promise;
const connect = mongoose.connect("mongodb://localhost/people", {
  useMongoClient: true
});
/* eslint no-console: 0 */
connect.then(
  () => {
    server.listen(port);
    console.log(`Server Listening on ${port}`);
  },
  err => {
    console.log("\n************************");
    console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
    console.log("************************\n");
  }
);
