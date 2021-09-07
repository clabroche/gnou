<template>
  <div is="main" class="home-root">
  </div>
</template>

<script>
import {API} from '@iryu54/room-lib-front'
export default {
  name: "Home",
  mounted() {
    this.createRoom()
  },
  methods: {
    async createRoom() {
      const username = Math.random()
      localStorage.setItem('username', username)
      const room = await API.createRoom(username)
      setTimeout(() => {
        this.goRoom(room.id)
      }, 100);
    },
    goRoom(roomId){
      this.$router.push({ name: 'game', params: { room: roomId } })
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
