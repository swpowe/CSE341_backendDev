const mongoose = require('mongoose');

const User = require('./user');
const ToDoItem = require('./toDoItem');
const {ObjectId} = require('mongodb');

const database = 'new_mongoose';

const addUser = async (name, email, pwd) => {
  await mongoose.connect(process.env.MONGODB_URI, {dbName: database});
  const user = new User();
  user.name = name;
  user.emailAddress = email;
  user.password = pwd;

  try {
    const id = await user.save();
    console.log(`ID created: ${id}`);
    setCurrentUserId(id._id);
    console.log(`ENV: ${getCurrentUserId()}`);
    return id;
  } catch (error) {
    console.log(error._message);
    return error._message;
  }
};

const addToDoItem = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {dbName: database});
  const item = new ToDoItem();
  item.title = 'pullled apart';
  item.description = 'ToDo item description';

  try {
    const id = await item.save();
    console.log(`ID created: ${id}`);
  } catch (error) {
    console.log(error.errors.description.message);
  }
};

function setCurrentUserId(_id) {
  process.env['CURRENT_USER_ID'] = _id;
}

function getCurrentUserId() {
  if (process.env['CURRENT_USER_ID'] != null) {
    return process.env['CURRENT_USER_ID'];
  } else {
    return 1
  }
}

const modifyToDoItem = async (id, updates) => {
  // const id = '634f63fe0d5d8d66e6253d40';
  await mongoose.connect(process.env.MONGODB_URI, {dbName: database});
  const connection = mongoose.connection;
  const collection = connection.db.collection('todos');

  try {
    const filter = {_id: new ObjectId(id)};
    // const update = {title: 'this has been updated 3'};
    const data = await collection.replaceOne(filter, updates, {new: true});
    console.log(data);
    // console.log(await collection.findOne(filter));
  } catch (error) {
    console.log(error);
  }
};

const deleteToDoItem = async (id) => {
  console.log(`Delete ID: ${id}`);
  await mongoose.connect(process.env.MONGODB_URI, {dbName: database});
  const connection = mongoose.connection;
  const collection = connection.db.collection('todos');

  try {
    const filter = {_id: new ObjectId(id)};
    const data = await collection.deleteOne(filter);
    console.log(data);
    return data;
    
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {addUser, addToDoItem, deleteToDoItem, modifyToDoItem};
