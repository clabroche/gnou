const express = require('express');
const router = express.Router();
const Theme = require('../services/theme')
const {room} = require("@iryu54/room-lib-server").controllers;
const {Room} = require('@iryu54/room-lib-server').models
Room.Game = Theme

router.get('/', (req, res, next) => {
  res.json({ Type: "API" })
})
router.use('/rooms', room.getRoutes(Theme))
router.use('/rooms', require('./room'))

module.exports = router;