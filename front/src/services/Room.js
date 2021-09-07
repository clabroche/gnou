import { Room, API} from '@iryu54/room-lib-front'

class MyRoom extends Room {
  static async launchDices(username, roomId) {
    await API.instance.post(`/api/rooms/${username}/${roomId}/launch-dices`)
  }
  static async generateChoices(username, roomId, letter, numbers) {
    await API.instance.post(`/api/rooms/${username}/${roomId}/generateChoices/${letter}/${numbers}`)
  }
  static async voteChoice(username, roomId, letter, number) {
    await API.instance.post(`/api/rooms/${username}/${roomId}/voteChoice/${letter}/${number}`)
  }
  static async chooseChoice(username, roomId, letter, number) {
    await API.instance.post(`/api/rooms/${username}/${roomId}/chooseChoice/${letter}/${number}`)
  }
  static async clickOnWord(username, roomId, wordIndex) {
    await API.instance.post(`/api/rooms/${username}/${roomId}/click-on-word/${wordIndex}`)
  }
  static async restart(username, roomId) {
    await API.instance.post(`/api/rooms/${username}/${roomId}/restart`)
  }
}



export default  MyRoom