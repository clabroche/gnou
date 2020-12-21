import axios from 'axios'
import Room from './Room'
export default {
  instance: axios.create({
    baseURL: `${process.env.VUE_APP_SERVER_URL}`
  }),
  async getRoom(roomId) {
    const { data: room } = await this.instance.get(`/api/rooms/${roomId}`)
    if (room) return new Room(room)
  },
  async createRoom(username, roomId) {
    const { data: room } = await this.instance.post(roomId ? `/api/rooms/create/${username}/${roomId}` : `/api/rooms/create/${username}`)
    if (room) return new Room(room)
  },
  async joinExistingRoom(roomId, username) {
    const { data: room } = await this.instance.post(`/api/rooms/join/${roomId}/${username}`)
    if (room) return new Room(room)
  },
  async launchDices(username, roomId) {
    await this.instance.post(`/api/rooms/${username}/${roomId}/launch-dices`)
  },
  async generateChoices(username, roomId, letter, numbers) {
    await this.instance.post(`/api/rooms/${username}/${roomId}/generateChoices/${letter}/${numbers}`)
  },
  async voteChoice(username, roomId, letter, number) {
    await this.instance.post(`/api/rooms/${username}/${roomId}/voteChoice/${letter}/${number}`)
  },
  async chooseChoice(username, roomId, letter, number) {
    await this.instance.post(`/api/rooms/${username}/${roomId}/chooseChoice/${letter}/${number}`)
  },
  async clickOnWord(username, roomId, wordIndex) {
    await this.instance.post(`/api/rooms/${username}/${roomId}/click-on-word/${wordIndex}`)
  },
  async restart(username, roomId) {
    await this.instance.post(`/api/rooms/${username}/${roomId}/restart`)
  },
}