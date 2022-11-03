const express = require('express');
const {requiresAuth} = require('express-openid-connect');
// eslint-disable-next-line new-cap
const router = express.Router();
const path = require('path');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

const {
  createUser,
  createUserForm,
  testUser,
} = require('../controllers/user.controller');

const {
  getAllTodos,
  getOneTodo,
  addTodo,
  deleteTodo,
  modifyTodo,
} = require('../controllers/todo.controller.js');

// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
  // eslint-disable-next-line max-len
  // res.send(req.oidc.isAuthenticated() ? 'Logged in but no callback 2?' : 'Logged out');
  if (req.oidc.isAuthenticated()) {
    console.log(req);
    res.sendFile(path.join(__dirname, '../views', 'main.html'));
    // authenticate / load mongo DB connection
  }
  // res.send(
  //   req.oidc.isAuthenticated() ? 'Logged in but no callback 2?' : 'Logged out',
  // );
});

router.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});


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
