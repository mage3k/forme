import Vue from 'vue'
import App from './App.vue'
import Forme from '../src/'

Vue.use(Forme)

new Vue({
  el: '#app',
  render: h => h(App)
})
