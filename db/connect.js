const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

const mongodb_username = process.env.MONGO_USR;
const mongodb_password = process.env.MONGO_PWD;
const uri = `mongodb+srv://${mongodb_username}:${mongodb_password}@cluster0.ku9wvjq.mongodb.net/assignments?retryWrites=true&w=majority`;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  MongoClient.connect(uri)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};