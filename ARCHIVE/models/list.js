const mongoose = require('mongoose');
const {ToDoItem} = require('./toDoItem');

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: [true, 'You need to add a description.'],
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Low',
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  assignedTo: {
    type: String,
  },
  toDoItems: [
    {
      type: ToDoItem,
    },
  ],

});

module.exports = mongoose.model('List', listSchema);

