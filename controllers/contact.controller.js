/* eslint-disable semi */
/* eslint-disable guard-for-in */
/* eslint-disable new-cap */
/* eslint-disable max-len */
const {ObjectId} = require('mongodb');
const mongodb = require('../db/connect');

const addContact = async (req, res) => {
  const _contacts = await mongodb.getDb().db().collection('contacts');
  const contact = req.body;
  _contacts.insertOne(contact, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    const id = contact._id;
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
        .collection('contacts')
        .deleteOne({_id: ObjectId(id)});
    res.status(200).send(`Deleted id: ${id}`);
  } catch (e) {
    console.log(e);
    res.status(500).send(`Error deleting id: ${id} : ${e}`);
  }
};

const modifyContact = async (req, res) => {
  const id = req.body.contactId;
  const data = req.body;
  const newData = {};
  for (const property in data) {
    console.log(`${property}: ${data[property]}`);
    if (property != '' || property != null) {
      console.log(`${property} added.`);
      newData.property = data[property];
    }
  }
  console.log(newData);
  // await client.db("assignments").collection("contacts").findOne({ _id: new ObjectId(id)});
  try {
    await mongodb
        .getDb()
        .db()
        .collection('contacts')
        .updateOne(
            {_id: ObjectId(id)},
            {
              $max: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                favoriteColor: data.favoriteColor,
                birthday: data.birthday,
              },
            },
        );
    res.status(204).send(`Modified id: ${id}`);
  } catch (e) {
    console.log(e);
    res.status(500).send(`Error deleting id: ${id} : ${e}`);
  }
};

const getAllContacts = async (req, res) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getOneContact = async (req, res) => {
  const id = req.params.id;
  await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .findOne({_id: new ObjectId(id)}).then((result) => {
        if (result == null) {
          res.send('No contact found. Check your ID.')
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(result);
        }
      })
      .catch((error) => {
        res.status(500).json(error)
      });
};

module.exports = {
  getOneContact,
  getAllContacts,
  addContact,
  deleteContact,
  modifyContact,
};
