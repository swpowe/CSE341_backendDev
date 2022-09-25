const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

// const app = express();
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));


const {
  showName,
  showContacts,
  showContact,
} = require('../controllers/showName.controller');

const {
  addContact,
  // modifyContact,
  // deleteContact,
} = require('../controllers/contact.controller');

router.get('/', showName);

router.get('/contacts', showContacts);
router.get('/contact', showContact);

// Lesson 3 Personal Assignment
// ## POST route to create a new contact
// ## returns the new contact ID
// ## returns success status code
// router.get('/contact-add', addContact);
router.post('/contact-add', addContact);

// ## PUT route to update a contact
// ## ex. api-url-path/contacts/id-to-modify
// ## returns success status code
// !!router.put('/contact-modify', modifyContact);

// ## DELETE route to delete a contact
// ## returns a success status code
// !!router.delete('/contact-delete', deleteContact);

// ## rest file

module.exports = router;
