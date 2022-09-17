const express = require("express");
const router = express.Router();

const { showName } = require("../controllers/showName.controller")

router.get("/", showName);

module.exports = router;
