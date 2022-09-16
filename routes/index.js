const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("Home Route Launched");
  // console.log(req.header('Connection'));
  res.send("<html><h1>Spencer Powell</h1></html>");
});

module.exports = router;
