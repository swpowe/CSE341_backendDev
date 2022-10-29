const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

const {
  createUser,
  createUserForm,
} = require('../controllers/user.controller');

const {
  getAllTodos,
  getOneTodo,
  addTodo,
  deleteTodo,
  modifyTodo,
} = require('../controllers/todo.controller.js');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.get('/create-user', createUserForm);
router.post('/create-user', createUser);

router.get('/todos', getAllTodos);
router.get('/todo/:id', getOneTodo);
router.post('/add-todo', addTodo);
router.put('/modify-todo/:id', modifyTodo);
router.delete('/delete-todo/:id', deleteTodo);

module.exports = router;
