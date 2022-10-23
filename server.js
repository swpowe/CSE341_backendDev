/* eslint-disable */
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;

const {addUser, addToDoItem} = require('./models/index')
const routes = require('./routes/index');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());

app.use(routes);

// app.listen(port, console.log(`Connected to DB and listening on ${port}`));


// addUser();

// !! addToDoItem(); // Calls from other file

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});