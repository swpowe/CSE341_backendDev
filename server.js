/* eslint-disable */
require('dotenv').config();

const addToDoItem = require('./models/index')

const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());

const port = process.env.PORT || 8080;

console.log(`Connected to DB and listening on ${port}`);

addToDoItem(); // Calls from other file