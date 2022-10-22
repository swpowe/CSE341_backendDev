const mongoose = require('mongoose');

const toDoItemSchema = new mongoose.Schema({
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
  LIST_ID: {
    type: String,
  },
});

module.exports = mongoose.model('ToDoItem', toDoItemSchema);


// module.exports = (mongoose) => {
//   const ToDoItem = mongoose.model('todos', mongoose.Schema({
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//     },
//     priority: {
//       type: String,
//       enum: ['Low', 'Medium', 'High'],
//       default: 'Low',
//     },
//     startDate: {
//       type: String,
//     },
//     endDate: {
//       type: String,
//     },
//     completed: {
//       type: String,
//     },
//     assignedTo: {
//       type: String,
//     },
//     LIST_ID: {
//       type: String,
//     },
//   }));
//   return ToDoItem;
// };
