require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());

const routes = require('./routes/index');

const port = process.env.PORT || 8080;

app.use(routes);

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
