const {Schema, model} = require('mongoose');

const toDoItemSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
});

const ToDoItem = model('ToDoItem', toDoItemSchema);


module.exports = ToDoItem;

