const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

const {createUser, createUserForm} = require('../controllers/user.controller');

const {
  getAllTodos,
  getOneTodo,
  addTodo,
} = require('../controllers/todo.controller');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.get('/create-user', createUserForm);
router.post('/create-user', createUser);

router.get('/todos', getAllTodos);
router.get('/todo/:id', getOneTodo);
router.post('/add-todo', addTodo);
// router.put();
// router.delete();

module.exports = router;
