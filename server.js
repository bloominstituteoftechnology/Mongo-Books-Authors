const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
// import your models here to use throught your API
const app = express();

app.use(bodyParser.json());

server.listen(port).then()