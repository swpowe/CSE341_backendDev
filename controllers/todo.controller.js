const mongodb = require('../db/connect');
const {ObjectId} = require('mongodb');

const getAllTodos = async (req, res) => {
  console.log('get all todos controller');

  const todos = await mongodb.getDb().db().collection('todos').find();
  todos.toArray().then((items) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(items);
  });

  // res.json({});
};
const getOneTodo = async (req, res) => {
  console.log('get One Todo controller');

  const todo = await mongodb
      .getDb()
      .db()
      .collection('todos')
      .findOne({_id: new ObjectId(req.params.id)});
  res.status(201).json(todo);
};
const addTodo = async (req, res) => {
  console.log('Add To Do controller');
  res.json({});
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




