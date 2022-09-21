const express = require("express");
const router = express.Router();

const controller = require('../controllers/index')

const cors = require("cors");

// router.use(cors({
//   origin: 'http://localhost:8080/professional'
// }))

router.use(cors());

router.get("/", (req, res) => {
  console.log("Home Route Launched");
  res.send("<html><h1>Spencer Powell</h1></html>");
});

router.get("/professional", controller);

module.exports = router;
