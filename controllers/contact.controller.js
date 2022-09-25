const mongodb = require("../db/connect");

const addContact = async (req, res) => {
  const _database = await mongodb.getDb().db();
  const _contacts = _database.collection('contacts').find();

  res.json(_contacts);
  // _database.toArray().then((lists) => {
  //   res.setHeader("Content-Type", "application/json");
  //   res.status(200).json(lists);
};

module.exports = {addContact};