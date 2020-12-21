import Socket from './Socket'
function Room(room) {
  this.id = room.id
  this.users = room.users
  this.theme = room.theme
  this.creatorId = room.creatorId
  Socket.socket.on("update:users", users => {
    if (users && Array.isArray(users)) {
      return this.users = users
    }
    return this.users = [];
  });
  Socket.socket.on("update:theme", theme => {
    if (theme) {
      return this.theme = theme
    }
  })
  Socket.socket.on("update:creatorId", creatorId => {
    console.log('update creator')
    if (creatorId) {
      return this.creatorId = creatorId
    }
  });
  Socket.socket.on("error", (data) => {
    alert(data);
  })
}
export default Room