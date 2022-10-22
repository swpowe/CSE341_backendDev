module.exports = (mongoose) => {
  const ToDoItem = mongoose.model('todos', mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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
      type: String,
    },
    assignedTo: {
      type: String,
    },
    LIST_ID: {
      type: String,
    },
  }));
  return ToDoItem;
};
