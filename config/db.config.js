/* eslint-disable camelcase */
const dotenv = require('dotenv');
dotenv.config();

const mongodb_username = process.env.MONGO_USR;
const mongodb_password = process.env.MONGO_PWD;

module.exports = {
  url: `mongodb+srv://${mongodb_username}:${mongodb_password}@cluster0.ku9wvjq.mongodb.net/?retryWrites=true&w=majority`,
};
