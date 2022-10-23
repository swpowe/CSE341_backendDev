const mongodb = require('../db/connect');
const {ObjectId} = require('mongodb');

const {deleteToDoItem, modifyToDoItem} = require('../models/index');

const getAllTodos = async (req, res) => {
  const todos = await mongodb.getDb().db().collection('todos').find();
  todos.toArray().then((items) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(items);
  });
};

const getOneTodo = async (req, res) => {
  const todo = await mongodb
      .getDb()
      .db()
      .collection('todos')
      .findOne({_id: new ObjectId(req.params.id)});
  res.status(201).json(todo);
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

const modifyTodo = async (req, res) => {
  console.log(`Id: ${req.params.id}`);
  const id = req.params.id;
  const data = {
    title: 'passed new title',
    // 'description': 'new descript',
  };
  modifyToDoItem(id, data);
};

const deleteToDo = async (req, res) => {
  const id = req.params.id;
  const result = await deleteToDoItem(id);
  console.log(result.deletedCount);
  if (result.deletedCount == 1) {
    res.status(204).send('<html>Deleted.</html>');
  } else {
    res.status(500).send();
  }
};

module.exports = {
  getAllTodos,
  getOneTodo,
  addTodo,
  deleteToDo,
  modifyTodo,
};
