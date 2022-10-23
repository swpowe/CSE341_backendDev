const mongoose = require('mongoose');

const User = require('./user');
const ToDoItem = require('./toDoItem');

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

module.exports = {addUser, addToDoItem};
