<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style lang="scss">
@import url(./assets/css/reset.css);
@font-face{
  font-family: "Dimbo";
  src: url('./assets/font/Dimbo Regular.ttf') format("TrueType");
}
body {
  margin: 0;
}
#app {
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background: rgb(19,37,89);
  background: linear-gradient(151deg, rgba(19,37,89,1) 0%, rgba(0,212,255,1) 100%);
  user-select: none;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
input{
  width: 100%;
  font-size: 1.2rem;
  text-align: left;
  margin: 20px 0;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  padding: 0;
  background-color: transparent;
}
button{
  font-family: "Dimbo";
  font-size: 1.2rem;
  background: #06D6A0;
  border: none;
  transition-duration: 0.3s;
  outline: none;
  margin: 2px;
  border-radius: 4px;
}
</style>
