import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'
import VueApexCharts from 'vue-apexcharts'
import { rtdbPlugin } from 'vuefire'
import router from './router'

Vue.config.productionTip = false

Vue.component('apexchart', VueApexCharts)
Vue.use(rtdbPlugin)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
