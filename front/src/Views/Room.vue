<template>
  <div id="main" v-if="room.theme">
    <transition name="fade">
      <div v-if="!room.theme.choices && !room.theme.letter && isAdmin">
        <h2>Choisissez une lettre:</h2>
        <div class="letters">
          <div class="line">
            <div class="letter" @click="chooseLetter('A')">A</div>
            <div class="letter" @click="chooseLetter('B')">B</div>
          </div>
          <div class="line">
            <div class="letter" @click="chooseLetter('C')">C</div>
            <div class="letter" @click="chooseLetter('D')">D</div>
          </div>
        </div>
      </div>
      <div v-else-if="!room.theme.choices && !room.theme.numbers && isAdmin">
        <h2>Trouver des thèmes</h2>
        <dice :nbDices="2" @roll="roll"/>
      </div>
      <div v-else-if="!isAdmin && !room.theme.choices">
        <h2>Le créateur choisi un thème. <br><br>Veuillez patienter...</h2>
      </div>
      <div v-else-if="!room.theme.choice">
        <h2>Choisir un des thèmes</h2>
        <div class="choices" v-for="choice of room.theme.choices" :key="choice.id" @click="chooseChoice(choice.id)">
          <div class="id">{{choice.id}}</div>
          <div class="column">
            <div class="theme">{{choice.theme}}</div>
            <div class="vote" v-if="choice.votes">{{choice.votes.length}} votes</div>
          </div>
        </div>
      </div>
      <div v-if="room.theme.choice && !success" class="game">
        <section>
          <h2>Le thème est:</h2>
          <div class="theme-container">
            <div class="theme">
              {{room.theme.choice}}
            </div>
          </div>
        </section>
        <section class="section-words">
          <h2>Les mots à placer dans l'histoire sont: </h2>
          <div class="labels-container">
            <transition name="fade">
            <div class="labels" v-if="room.theme.dices" :key="room.theme.dices[0]+room.theme.dices[1]+room.theme.dices[2]+room.theme.dices[3]+room.theme.dices[4]+room.theme.dices[4]+room.theme.dices[5]+room.theme.dices[6]">
              <label  v-for="(dice, i) of room.theme.dices" :key="dice.label" class="label-container" :class="diceColors[i]" @click="clickOnWord(i)">
                <div class="number">{{i}}</div>
                <div class="label">{{dice.label}}</div>
                <transition name="fade">
                  <div class="isOk" v-if="dice.isOk">OK !</div>
                </transition>
              </label>
            </div>
            </transition>
            (Vous pouvez cliquer sur les mots pour signifier leurs utilisation)
          </div>
        </section>
      </div>
      <div v-else-if="room.theme.choice && success">
        <h2>Bravo !</h2>
        <br>
        <button @click="restart">Recommencer et devenir maître du jeu</button>
      </div>
    </transition>
    <div class="user-numbers">
      <img src="@/assets/img/user.svg" alt="">
      {{room.users.length +1 }}
    </div>
  </div>
</template>

<script>
import DiceVue from '../components/Dice.vue';
import Api from '../services/API'
import Socket from '../services/Socket';
export default {
  name: "Room",
  components: {
    Dice: DiceVue
  },
  data() {
    return  {
      username: localStorage.getItem('username'),
      elements: [],
      room: {
        id: '',
        users: [],
      },
      diceColors: [
        'yellow',
        'orange',
        'red',
        'purple',
        'blue',
        'black',
      ]
    }
  },
  computed: {
    isAdmin() {
      return this.room.creatorId === this.username
    },
    success() {
      return this.room && this.room.theme && this.room.theme.dices && this.room.theme.dices.every(dice => dice.isOk)
    }
  },
  async mounted() {
    if(!this.username) this.username = Math.random()
    this.room.id = this.$route.params.room;
    this.room = await Api.getRoom(this.room.id)
      .catch(() =>  Api.createRoom(this.username, this.room.id))
    await Api.joinExistingRoom(this.room.id, this.username)
    Socket.socket.emit('connectRoom', this.username, this.room.id)
  },
  methods: {
    restart() {
      Api.restart(this.username, this.room.id)
    },
    clickOnWord(wordIndex) {
      Api.clickOnWord(this.username, this.room.id, wordIndex)
    }, 
    goToHome() {
      this.$router.push({name: 'home'})
    },
    chooseLetter(letter) {
      this.$set(this.room.theme, 'letter', letter)
    },
    roll(numbers) {
      this.$set(this.room.theme, 'numbers', numbers)
      this.generateChoices()
    },
    isAdministrator() {
      return this.room.creatorId === this.username
    },
    async chooseChoice(choiceId) {
      if(this.isAdministrator()) {
        await Api.chooseChoice(this.username, this.room.id, this.room.theme.letter, choiceId)
        return Api.launchDices(this.username, this.room.id)
      } else {
        await Api.voteChoice(this.username, this.room.id, this.room.theme.letter, choiceId)
      }
    },
    generateChoices() {
      return Api.generateChoices(this.username, this.room.id, this.room.theme.letter, this.room.theme.numbers)
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 90%;
  margin: auto;
}
h2 {
  font-size:1.8em;
  font-weight: bold;
  margin-bottom: 20px;
}
.letters {
  display: flex;
  flex-direction: column;
  .line {
    display: flex;
    justify-content: center;
    .letter {
      width: 60px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;
      color: #0d5d8e;
      font-weight: bold;
      margin: 10px;
      font-size: 2em;
      border-radius: 10px;
    }
  }
}
.choices {
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  background-color: white;
  box-sizing: border-box;
  margin: 10px 0;
  color: #0f4c7e;
  align-items: center;
  border-radius: 4px;
  height: 75px;
  position: relative;
  .id {
    width: 30px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #0f4c7e;
  }
  .theme {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    text-align: center;
  }
  .column {
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }
  .vote {
    margin-top: 5px;
    position: absolute;
    bottom: 0;
    right: 10px;
  }
}
.game {
  section {
    .labels-container {
      position: relative;
      height: 250px;
    }
    margin-bottom: 80px;
    h2 {
      margin-bottom: 10px;
    }
    
    .theme {
      display: inline-block;
      padding: 10px;
      background-color: white;
      color: #0f4577;
      font-weight: bold;
      border-radius: 4px;
      font-size: 1.8em;
    }
    .labels {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      height: 240px;
      label {
        &.yellow {
          background-color: #E7B80B;
          color: black;
          .number{
            border-color: black;
          }
        }
        &.orange {
          background-color: #D76705;
          color: white;
        }
        &.red {
          background-color: #B10D25;
          color: white;
        }
        &.purple {
          background-color: #51014A;
          color: white;
        }
        &.blue {
          background-color: #083A68;
          color: white;
        }
        &.black {
          background-color: #000000;
          color: white;
        }

        display: flex;
        border-radius: 4px;
        margin: 10px;
        width: 30%;
        height: 40px;
        justify-content: center;
        align-items: center;
        position: relative;
        padding: 10px;
        .number {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          border-right: 1px solid white;
          padding-right: 10px;
        }
        .label {
          flex-grow: 1;
        }
        .isOk {
          background-color: red;
          border-radius: 4px;
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          color: #41cc41;
          background-color: rgb(0, 125, 0);
        }
      }
    }
  }
}
.user-numbers {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 10px;
  border-top: 1px solid white;
  border-left: 1px solid white;
  border-top-left-radius: 10px;
  img {
    width: 40px;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
