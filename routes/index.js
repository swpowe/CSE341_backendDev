const express = require("express");
const router = express.Router();

const { showName, showContacts } = require("../controllers/showName.controller")

router.get("/", showName);

router.get('/contacts', showContacts);

module.exports = router;
