const {ObjectId} = require('mongodb');

const Item = require('../models/toDoItem');
const {default: mongoose} = require('mongoose');

const getAllTodos = async (req, res) => {
  console.log('get all todos controller');
  const itemsArray = [];
  await mongoose.connect(process.env.MONGODB_URI);

  for await (const item of Item.find()) {
    console.log(item);
    itemsArray.push(JSON.stringify(item));
  }
  const count = itemsArray.length;
  res.render('main', {items: itemsArray, display: 'none', itemsCount: count});
};

const getOneTodo = async (req, res) => {
  console.log('get One Todo controller');
  const itemsArray = [];
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(req.body.id);
    for await (const item of Item.findOne({_id: new ObjectId(req.body.id)})) {
      itemsArray.push(JSON.stringify(item));
    }
    res.render('main', {items: itemsArray, display: 'none', itemsCount: 1});
  } catch (error) {
    console.log(`Error: ${error}`);
    itemsArray.push(JSON.stringify(error));
    res.render('main', {items: itemsArray, display: 'inline', itemsCount: 0});
  }
};

const addTodo = async (req, res) => {
  console.log('Add To Do controller');
  console.log(req.body);

  const newItem = {
    listName: req.body.listName,
    items: {
      title: req.body.title,
      description: req.body.description,
    }};

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const item = await Item.create(newItem);
    console.log(item);
    res.status(200).redirect('/todos');
  } catch (error) {
    console.log(error);
    res.status(400).render('main', {items: [], display: 'inline'});
  }
};

const deleteTodo = async (req, res) => {
  console.log('Delete controller');
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Item.findByIdAndDelete({_id: new ObjectId(req.body.id)});
    // res.render('main', {items: itemsArray, display: 'none'});
    res.status(200).redirect('/todos');
  } catch (error) {
    console.log(`Error: ${error}`);
    itemsArray.push(JSON.stringify(error));
    res.status(404).send(`ERROR: ${error}`);
    // res.render('main', {items: itemsArray, display: 'inline'});
  }
};

const modifyTodo = async (req, res) => {
  console.log('modify todo controller');
  res.json({});
};

module.exports = {getAllTodos, getOneTodo, addTodo, deleteTodo, modifyTodo};
