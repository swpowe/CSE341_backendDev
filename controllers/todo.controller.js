const mongodb = require('../db/connect');
const {ObjectId} = require('mongodb');

const Item = require('../models/toDoItem');
// const ToDoItem = require('../models/toDoItem');
const {default: mongoose} = require('mongoose');

const getAllTodos = async (req, res) => {
  console.log('get all todos controller');

  const todos = await mongodb.getDb().db().collection('lists').find();
  todos.toArray().then((items) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(items);
  });
};

const getOneTodo = async (req, res) => {
  console.log('get One Todo controller');
  // get form input
  console.log(req);

  const todo = await mongodb
      .getDb()
      .db()
      .collection('todos')
      .findOne({_id: new ObjectId(req.params.id)});
  res.status(201).json(todo);
};

const addTodo = async (req, res) => {
  console.log('Add To Do controller');
  console.log(req.body);

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const item = await Item.create(req.body);
    console.log(item);
    res.status(200).send('<h1>added</h1>');
  } catch (error) {
    console.log(error);
  }
};

const deleteTodo = async (req, res) => {
  console.log('Delete controller');
  res.json({});
};

const modifyTodo = async (req, res) => {
  console.log('modify todo controller');
  res.json({});
};

module.exports = {getAllTodos, getOneTodo, addTodo, deleteTodo, modifyTodo};


// import meal model (the main model)


