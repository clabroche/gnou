const express = require('express');
const sockets = require('../services/sockets');
const Rooms = require('../services/Rooms')
const Users = require('../services/Users');
const router = express.Router();
const uuid = require('uuid').v4;
const Theme = require('../services/theme');

router.get('/:roomId', (req, res, next) => {
  const { roomId } = req.params
  const room = Rooms.get(roomId)
  if(room) {
    res.json(room)
  } else {
    res.status(404).send('Room not found')
  }
})
router.post('/create/:username', (req, res, next) => {
  const { username } = req.params
  const roomId = uuid().split('-')[0]
  const user = Users.getOrCreate(username)
  const room = Rooms.getOrCreate(roomId, user.username)
  room.join(user)
  res.json(room)
})
router.post('/create/:username/:roomId', (req, res, next) => {
  const { username } = req.params
  const roomId = req.params.roomId
  const user = Users.getOrCreate(username)
  const room = Rooms.getOrCreate(roomId, user.username)
  room.join(user)
  res.json(room)
})
router.post('/:username/:roomId/launch-dices', (req, res, next) => {
  const { username } = req.params
  const roomId = req.params.roomId
  const user = Users.getOrCreate(username)
  const room = Rooms.getOrCreate(roomId, user.username)
  room.theme.launchDices()
  sockets.updateTheme(roomId, room.theme)
  res.json(room)
})
router.post('/:username/:roomId/generateChoices/:letter/:numbers', (req, res, next) => {
  const { username, roomId, letter } = req.params
  const numbers = req.params.numbers.split(',')
  const user = Users.getOrCreate(username)
  const room = Rooms.getOrCreate(roomId, user.username)
  room.theme.chooseTheme(letter, numbers)
  sockets.updateTheme(roomId, room.theme)
  res.json(room)
})
router.post('/:username/:roomId/chooseChoice/:letter/:number', (req, res, next) => {
  const { username, roomId, letter, number } = req.params
  const user = Users.getOrCreate(username)
  const room = Rooms.getOrCreate(roomId, user.username)
  room.theme.chooseTheme(letter, number)
  sockets.updateTheme(roomId, room.theme)
  res.json(room)
})
router.post('/:username/:roomId/restart', (req, res, next) => {
  const { username, roomId, } = req.params
  const user = Users.getOrCreate(username)
  const room = Rooms.getOrCreate(roomId, user.username)
  if(username !== room.creatorId) {
    room.creatorId = username
  }
  room.theme = new Theme()
  sockets.updateTheme(roomId, room.theme)
  sockets.updateUsers(roomId, room.users)
  sockets.updateCreator(roomId, room.creatorId)
  res.json(room)
})
router.post('/:username/:roomId/click-on-word/:wordIndex', (req, res, next) => {
  const { username, roomId, wordIndex} = req.params
  const user = Users.getOrCreate(username)
  const room = Rooms.getOrCreate(roomId, user.username)
  room.theme.clickOnWord(+wordIndex)
  sockets.updateTheme(roomId, room.theme)
  res.json(room)
})
router.post('/:username/:roomId/voteChoice/:letter/:number', (req, res, next) => {
  const { username, roomId, letter, number } = req.params
  const user = Users.getOrCreate(username)
  const room = Rooms.getOrCreate(roomId, user.username)
  room.theme.voteTheme(username, number)
  sockets.updateTheme(roomId, room.theme)
  res.json(room)
})
router.post('/join/:roomId/:username', (req, res, next) => {
  const { roomId, username } = req.params
  const user = Users.getOrCreate(username)
  const room = Rooms.get(roomId)
  if (room) {
    room.join(user)
    res.json(room)
  } else {
    res.status(404).send('Room not found')
  }
})

module.exports = router;