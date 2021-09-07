const express = require('express');
const router = express.Router();
const {controllers, models, sockets} = require('../modules')
const {roomBaseUrl} = controllers
const {Rooms, Users} = models

router.post(`${roomBaseUrl}/launch-dices`, (req, res, next) => {
  const { username } = req.params
  const roomId = req.params.roomId
  const user = Users.getOrCreate(username)
  const room = Rooms.getOrCreate(roomId, user.username)
  room.game.launchDices()
  sockets.updateGame(room)
  res.json(room)
})
router.post(`${roomBaseUrl}/generateChoices/:letter/:numbers`, (req, res, next) => {
  const { username, roomId, letter } = req.params
  const numbers = req.params.numbers.split(',')
  const user = Users.getOrCreate(username)
  const room = Rooms.getOrCreate(roomId, user.username)
  room.game.chooseTheme(letter, numbers)
  sockets.updateGame(room)
  res.json(room)
})
router.post(`${roomBaseUrl}/chooseChoice/:letter/:number`, (req, res, next) => {
  const { username, roomId, letter, number } = req.params
  const user = Users.getOrCreate(username)
  const room = Rooms.getOrCreate(roomId, user.username)
  room.game.chooseTheme(letter, number)
  sockets.updateGame(room)
  res.json(room)
})

router.post(`${roomBaseUrl}/click-on-word/:wordIndex`, (req, res, next) => {
  const { username, roomId, wordIndex } = req.params
  const user = Users.getOrCreate(username)
  const room = Rooms.getOrCreate(roomId, user.username)
  room.game.clickOnWord(+wordIndex)
  sockets.updateGame(room)
  res.json(room)
})
router.post(`${roomBaseUrl}/voteChoice/:letter/:number`, (req, res, next) => {
  const { username, roomId, letter, number } = req.params
  const user = Users.getOrCreate(username)
  const room = Rooms.getOrCreate(roomId, user.username)
  room.game.voteTheme(username, number)
  sockets.updateGame(room)
  res.json(room)
})
module.exports = router;