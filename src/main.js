import Vue from 'vue'
import App from './App.vue'
import { store } from './store/index'
import VueTimeago from 'vue-timeago'
import VueRouter from 'vue-router'

import ListTodo from './components/ListTodo.vue'
import Compeleted from './components/filter_Todo/Complete.vue'
import Important from './components/filter_Todo/Important.vue'
import Deleted from './components/filter_Todo/Deleted.vue'


Vue.use(VueTimeago, {
  name: 'Timeago',
  locale: 'en',


  locales: {
    'zh-CN': require('date-fns/locale/zh_cn'),
    ja: require('date-fns/locale/ja')
  }
})

Vue.use(VueRouter)
const routes = [
  { path: '/', component: ListTodo },
  { path: '/important', component: Important },
  { path: '/complete', component: Compeleted },
  { path: '/deleted', component: Deleted }
]




const router = new VueRouter({
  routes
})
Vue.config.productionTip = false
new Vue({
  router,
  store: store,
  render: h => h(App),
}).$mount('#app')
