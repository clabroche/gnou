const Theme = require('./theme')

function Room(roomId, creatorId) {
  this.id = roomId
  this.creatorId =  creatorId
  /** @type {import('./User')[]} */
  this.users = []
  this.theme = new Theme()
}
/**
 * 
 * @param {import('./User')} user 
 */
Room.prototype.join = function (user) {
  if (!this.hasAlreadyUser(user.username)) {
    this.users.push(user)
  }
}
/**
 * 
 * @param {import('./User')} user 
 */
Room.prototype.unjoin = function (user) {
  this.users = this.users.filter(_user => _user.username !== user.username)
}

/**
 * 
 * @param {String} username
 */
Room.prototype.hasAlreadyUser = function (username) {
  const user = this.getUserFromUsername(username)
  return username === this.creatorId || user ? true : false
}

/**
 * 
 * @param {String} username
 */
Room.prototype.getUserFromUsername = function (username) {
  return this.users.filter(user => user.username === username).pop()
}

module.exports = Room