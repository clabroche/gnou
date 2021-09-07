const express = require('express');
const router = express.Router();
const Theme = require('../services/theme')
const {room} = require("../modules").controllers;
const Room = require('../modules/models/Room')
Room.Game = Theme

router.get('/', (req, res, next) => {
  res.json({ Type: "API" })
})
router.use('/rooms', room.getRoutes(Theme))
router.use('/rooms', require('./room'))

module.exports = router;