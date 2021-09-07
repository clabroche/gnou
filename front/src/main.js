import Vue from 'vue'
import VueRouter from 'vue-router'
import {initRoomLib} from './RoomLib/index'

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
initRoomLib({router})
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
