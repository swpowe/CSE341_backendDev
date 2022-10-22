const mongoose = require('mongoose');
const ToDoItem = require('./toDoItem')(mongoose);
// const Schema = mongoose.Schema;

const addToDoItem = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {dbName: 'new_mongoose'});

  // !! Pull from external file
  const ToDoItem = new Schema({
    title: String,
    description: {
      type: String,
      required: true,
    },
  });

  const MyModel = mongoose.model('ToDo', ToDoItem);

  const item = new MyModel();
  item.title = ' pullled apart';
  item.description = 'ToDo item description';

  try {
    const id = await item.save();
    console.log(`ID created: ${id}`);
  } catch (error) {
    console.log(error._message);
  }
};

module.exports = addToDoItem;
