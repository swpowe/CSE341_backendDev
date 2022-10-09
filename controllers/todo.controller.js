const mongodb = require('../db/connect');

const getAllTodos = async (req, res) => {
  const todos = await mongodb.getDb().db().collection('todos').find();
  todos.toArray().then((items) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(items);
  });
};

const getOneTodo = async (req, res) => {
  res.send('get One todo');
};

const addTodo = async (req, res) => {
  const todos = await mongodb.getDb().db().collection('todos');
  const newTodo = req.body;
  todos.insertOne(newTodo, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    const id = newTodo._id;
    res.status(201).send(`<html><h1>New ToDo was added. ID: ${id}</h1></html>`);
  });
};

module.exports = {
  getAllTodos,
  getOneTodo,
  addTodo,
};
