const { ObjectId } = require("mongodb");
const mongodb = require("../db/connect");

const addContact = async (req, res) => {
  const _contacts = await mongodb.getDb().db().collection("contacts");
  let contact = req.body;
  _contacts.insertOne(contact, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    let id = contact._id;
    res.status(201).send(`<html><h1>User was added. ID: ${id}</h1></html>`);
  });
};

const deleteContact = async (req, res) => {
  const id = req.body.deleteId;
  console.log(id);
  // await client.db("assignments").collection("contacts").findOne({ _id: new ObjectId(id)});
  try {
    await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .deleteOne({ _id: ObjectId(id) });
    res.status(200).send(`Deleted id: ${id}`);
  } catch (e) {
    console.log(e);
    res.status(500).send(`Error deleting id: ${id} : ${e}`);
  }
};

const modifyContact = async (req, res) => {
  const id = req.body.contactId;
  const data = req.body;
  let newData = {};
  for (const property in data) {
    console.log(`${property}: ${data[property]}`);
    if(property != '' || property != null) {
      console.log(`${property} added.`);
      newData.property = data[property]
    }
  }
  console.log(newData);
  // await client.db("assignments").collection("contacts").findOne({ _id: new ObjectId(id)});
  try {
    await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .updateOne({ _id: ObjectId(id) }, {$set: {firstName: data.firstName, lastName: data.lastName, email: data.email, favoriteColor: data.favoriteColor, birthday: data.birthday}});
    res.status(204).send(`Modified id: ${id}`);
  } catch (e) {
    console.log(e);
    res.status(500).send(`Error deleting id: ${id} : ${e}`);
  }
};

const displayContacts = async (req, res) => {
  const result = await mongodb.getDb().db().collection("contacts").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

module.exports = { displayContacts, addContact, deleteContact, modifyContact };
