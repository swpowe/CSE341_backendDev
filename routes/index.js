const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

const {
  getAllTodos,
  getOneTodo,
  addTodo,
} = require('../controllers/todo.controller');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.get('/todos', getAllTodos);
router.get('/todo/:id', getOneTodo);
router.post('/add-todo', addTodo);
// router.put();
// router.delete();

module.exports = router;
