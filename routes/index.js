const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

// const app = express();
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));

const {
  showName,
  showContacts,
  showContact,
} = require("../controllers/showName.controller");

const {
  displayContacts,
  addContact,
  modifyContact,
  deleteContact,
} = require("../controllers/contact.controller");

router.get("/", showName);

router.get("/contacts", displayContacts);
router.get("/contact", showContact);

// Lesson 3 Personal Assignment
// ## POST route to create a new contact
// ## returns the new contact ID
// ## returns success (201) status code
router.post("/contact-add", addContact);

// ## PUT route to update a contact
// ## ex. api-url-path/contacts/id-to-modify
// ## returns success (204) status code
router.put("/contact-modify", modifyContact);

// ## DELETE route to delete a contact
// ## returns a success (200) status code
// router.delete("/:id", (req, res) => {
//   console.log(`ID: ${req.params.id}`);
// });

router.post('/delete', deleteContact);

// ## rest file

module.exports = router;
