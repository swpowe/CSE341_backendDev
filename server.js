require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const routes = require('./routes/index');

const port = process.env.PORT || 3000;

app.use(routes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
