import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import SliderLoop from '@/components/SliderLoop'
import Pagination from '@/components/Pagination'
import store from '@/store'
import '@/mock/mockServer'
Vue.config.productionTip = false
Vue.component('TypeNav', TypeNav)
Vue.component('SliderLoop', SliderLoop)
Vue.component('Pagination', Pagination)
new Vue({
  // 全局定义事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  el:'#app',
  render: h => h(App),
  router,
  store
})
