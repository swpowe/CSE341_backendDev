const express = require("express");
const router = express.Router();

const {showName, showContacts, showContact} = require("../controllers/showName.controller")

router.get("/", showName);

router.get('/contacts', showContacts);
router.get('/contact', showContact);

module.exports = router;
