const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');



const {
  showName,
  // displayContacts,
  displaySingleContact,
} = require('../controllers/showName.controller');

const {
  displayContacts,
  addContact,
  modifyContact,
  deleteContact,
} = require('../controllers/contact.controller');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));
// router.get('/api-docs', (req, res) => {res.send('<html>docs</html>')});


// router.get('/', showName);

router.get('/contacts', displayContacts);
router.get('/contact', displaySingleContact);

// Lesson 3 Personal Assignment
// ## POST route to create a new contact
// ## returns the new contact ID
// ## returns success (201) status code
router.post('/addContact', addContact);

// ## PUT route to update a contact
// ## ex. api-url-path/contacts/id-to-modify
// ## returns success (204) status code
router.put('/modifyContact', modifyContact);

// ## DELETE route to delete a contact
// ## returns a success (200) status code
// router.delete("/:id", (req, res) => {
//   console.log(`ID: ${req.params.id}`);
// });

router.delete('/deleteContact', deleteContact);

// ## rest file

module.exports = router;
