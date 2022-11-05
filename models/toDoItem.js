const {Schema, model} = require('mongoose');

const toDoItemSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

const listSchema = new Schema({
  listName: {
    type: String,
    require: true,
  },
  items: [toDoItemSchema],
});

// const ToDoItem = model('ToDoItem', toDoItemSchema);
const Item = model('Item', listSchema);


// module.exports = ToDoItem;
module.exports = Item;

