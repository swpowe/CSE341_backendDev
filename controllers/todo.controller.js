const mongodb = require("../db/connect");
const { ObjectId } = require("mongodb");

const Item = require("../models/toDoItem");
// const ToDoItem = require('../models/toDoItem');
const { default: mongoose } = require("mongoose");

const getAllTodos = async (req, res) => {
  console.log("get all todos controller");
  let itemsArray = [];
  await mongoose.connect(process.env.MONGODB_URI);
  
  for await (const item of Item.find()) {
    console.log(item);
    itemsArray.push(JSON.stringify(item));
    
  }
  // const id = itemsArray[0];
  // console.log(`Single item: ${id._id}`);
  res.render('main', {items: itemsArray, display: 'none'});
  
  // const item = await Item.find().cursor();
  // // item.map((i) => console.log(i));
  // console.log(item[0]);

  // const list = item.toArray();
  // res.render('main', {items: list});

  // const todos = await mongodb.getDb().db().collection('lists').find();
  // console.log(todos);
  // todos.toArray().then((items) => {
  //   res.setHeader('Content-Type', 'application/json');
  //   res.status(200).json(items);
  // });
  // const items = todos.toArray();
  // console.log(items[0]);
  // res.render('main', {items: items});

  // try {
  //   const db = await mongoose.connect(process.env.MONGODB_URI);
  //   const todos = db.lists.find();
  //   // const todos = await mongodb.getDb().db().collection('lists').find();
  //   // const todos = await mongodb.getDb().db().collection('lists').find();
  //   const array = todos.toArray();
  //   // array.map((i) => console.log(i));
  //   console.log(array[0]);

  // } catch (error) {
  //   console.log(error);
  // }
};

const getOneTodo = async (req, res) => {
  console.log("get One Todo controller");
  // get form input
  // console.log(req);

  // const todo = await mongodb
  //   .getDb()
  //   .db()
  //   .collection("todos")
  //   .findOne({ _id: new ObjectId(req.params.id) });
  // res.status(201).json(todo);
  await mongoose.connect(process.env.MONGODB_URI);
  console.log(req.body.id);
  const itemsArray = [];
  for await (const item of Item.findOne({_id: new ObjectId(req.body.id)})) {
    // console.log(item);
    itemsArray.push(JSON.stringify(item));
  }
  res.render('main', {items: itemsArray, display: 'none'});
};

const addTodo = async (req, res) => {
  console.log("Add To Do controller");
  console.log(req.body);

  const newItem = {
    listName: req.body.listName, 
    items: {
      title: req.body.title, 
      description: req.body.description
    }};

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const item = await Item.create(newItem);
    console.log(item);
    res.status(200).send("<h1>added</h1>");
  } catch (error) {
    console.log(error);
    res.status(400).render('main', {items: [], display: 'inline'});
  }
};

const deleteTodo = async (req, res) => {
  console.log("Delete controller");
  res.json({});
};

const modifyTodo = async (req, res) => {
  console.log("modify todo controller");
  res.json({});
};

module.exports = { getAllTodos, getOneTodo, addTodo, deleteTodo, modifyTodo };

// import meal model (the main model)
