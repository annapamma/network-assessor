import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'
import VueApexCharts from 'vue-apexcharts'

Vue.config.productionTip = false

Vue.component('apexchart', VueApexCharts)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

