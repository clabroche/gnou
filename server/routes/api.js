const express = require('express');
const router = express.Router();

const room = require("./room.js");

router.get('/', (req, res, next) => {
  res.json({ Type: "API" })
})
router.use('/rooms', room)


module.exports = router;