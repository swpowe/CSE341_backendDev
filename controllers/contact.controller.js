const { MongoClient, ObjectId } = require("mongodb");
// const express = require("express");

const mongodb_username = process.env.MONGO_USR;
const mongodb_password = process.env.MONGO_PWD;

const addContact = (req, res) => {
  console.log(req.body);
  // const contacts = await client.db("assignments").collection("contacts").insertOne();
  console.log("Add Contact Route Reached");
  // await contacts.forEach((contact) => console.log(` - ${contact.firstName}`));
  res.send("<hmtl><h1>Contact ADded</h1></html>");
};

const modifyContact = (req, res) => {};

const deleteContact = (req, res) => {};

/**
 * Adds two numbers together.
 * @param {function} callback The first number.
 * @param {int} id The second number.
 */
async function mongoDb_Connect(callback, id) {
  // eslint-disable-next-line camelcase
  const uri = `mongodb+srv://${mongodb_username}:${mongodb_password}@cluster0.ku9wvjq.mongodb.net/?retryWrites=true&w=majority`;

  const client = new MongoClient(uri);

  try {
    await client.connect();
    await callback(client, id);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

module.exports = { addContact, modifyContact, deleteContact };