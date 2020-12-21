import Vue from 'vue'
import VueRouter from 'vue-router'
import Socket from './services/Socket'

Vue.use(VueRouter);

import App from './App.vue'
import Home from './Views/Home.vue'
import Room from './Views/Room.vue'

Vue.config.productionTip = false

const routes = [
  { name: 'home', path: '/', component: Home },
  { name: 'game', path: '/game/:room', component: Room},
  { path: '/:pathMatch(.*)*', redirect: {name: 'home'} },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'game' && from.name === 'game') {
    const answer = window.confirm("Voulez vous vous deconnecter ?")
    if (answer) {
      Socket.socket.emit('leave room', from.params.room)
      Socket.socket.emit('updateUser', {roomId: from.params.room})
      next()
    } else {
      next(false)
    }
  }else next()
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
