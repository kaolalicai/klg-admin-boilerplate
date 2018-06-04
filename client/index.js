import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import {sync} from 'vuex-router-sync'
import * as Cookies from 'js-cookie'
import Promise from 'promise-polyfill'
import ElementUI from 'element-ui'
import KlgPro from 'klg-admin-pro'
import 'element-ui/lib/theme-chalk/index.css'
import 'klg-admin-pro/lib/klg-css/index.css'
import vuexModuleData from './stores'
import {routes} from './common/router'
import App from './App.vue'

// Ele UI
Vue.use(ElementUI)

// Klg Pro
Vue.use(KlgPro)

// IE Polyfill
window.Promise = window.Promise || Promise

// Router
Vue.use(VueRouter)
const router = new VueRouter({mode: 'history', routes})

// Vuex
Vue.use(Vuex)
const store = new Vuex.Store(vuexModuleData)
sync(store, router)

console.log(Cookies.get('username'))
// Sync Cookie To Store
store.registerModule('cookie', {
  namespaced: true,
  state: {
    username: Cookies.get('username') || null
  }
})

// 挂载
new Vue({
  store,
  router,
  ...App
}).$mount('#app')
