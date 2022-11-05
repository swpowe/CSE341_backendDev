const mongodb = require('../db/connect');
const {ObjectId} = require('mongodb');

const Item = require('../models/toDoItem');
// const ToDoItem = require('../models/toDoItem');
const { default: mongoose } = require('mongoose');

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
  // const items = await mongodb.getDb().db().collection('lists');
  // const result = items.insertOne({listName: 'Manual List Name', items: [{title: req.body.title, description: req.body.description}]});


  // console.log(mongodb.getDb('final_project'));

  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error){
    console.log(error)
  }

  const item = await Item.create({
    listName: 'List One 3',
    items: {title: req.body.title, description: req.body.description},
  });
  console.log(item);

  // res.json(item);
  // await ToDoItem.createCollection('Lists');
  // const item = await ToDoItem.create({title: 'title test', description: 'desc test'});


  // console.log(result);
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


