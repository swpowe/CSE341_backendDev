const {Schema, model} = require('mongoose');

const toDoItemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const listSchema = new Schema({
  listName: {
    type: String,
    required: true,
  },
  items: [toDoItemSchema],
});

// const ToDoItem = model('ToDoItem', toDoItemSchema);
const Item = model('Item', listSchema);


// module.exports = ToDoItem;
module.exports = Item;

