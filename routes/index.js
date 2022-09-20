const express = require("express");
const router = express.Router();

const { showName, listContacts } = require("../controllers/showName.controller")

router.get("/", showName);

router.get('/contacts', listContacts);

module.exports = router;
