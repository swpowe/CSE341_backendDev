const { ObjectId } = require("mongodb");
const mongodb = require("../db/connect");

// const addContact = async (req, res) => {
//   console.log(req);
//   // const _database = await mongodb.getDb().db();
//   // const _contacts = _database.collection('contacts').find();

//   // res.json(_contacts);
//   // _database.toArray().then((lists) => {
//   //   res.setHeader("Content-Type", "application/json");
//   //   res.status(200).json(lists);
// };

const addContact = async (req, res) => {
  const _contacts = await mongodb.getDb().db().collection("contacts");
  let contact = req.body;
  _contacts.insertOne(contact, () => {
    // if (err) {
    //   console.log(err);
    //   return;
    // }
    let id = contact._id;
    res.status(201).send(`<html><h1>User was added. ID: ${id}</h1></html>`);
  });
};

const deleteContact = async (req, res) => {
  const id = req.body.deleteId;
  console.log(id);
  // await client.db("assignments").collection("contacts").findOne({ _id: new ObjectId(id)});
  // try {
  //   await client.db("assignments").collection("contacts").deleteOne({"_id" : ObjectId(id)});
  //   res.status(201).send(`Deleted id: ${id}`);
  // } catch (e) {
  //   console.log(e);
  // }
};

const modifyContact = () => {};

const displayContacts = async (req, res) => {
  const result = await mongodb.getDb().db().collection("contacts").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

module.exports = { displayContacts, addContact, deleteContact, modifyContact };
