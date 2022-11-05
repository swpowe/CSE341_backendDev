/* eslint-disable */
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongodb = require('./db/connect');
const routes = require('./routes/index');
const {auth} = require('express-openid-connect');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');

const port = process.env.PORT || 8080;
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: process.env.AUTH_BASE_URL,
  clientID: process.env.AUTH_CLIENT_ID,
  issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL,
};

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.use(cors());

app.use(routes);

app.set('json spaces', 2); //!! format json responses



mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});