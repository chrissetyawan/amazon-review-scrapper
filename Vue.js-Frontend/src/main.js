import Vue from "vue";
import App from "./App.vue";
import moment from 'moment'
import router from './router'

// import the styles
import 'vue-good-table/dist/vue-good-table.css'
import VueGoodTable from 'vue-good-table';

Vue.use(VueGoodTable);

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MMMM Do YYYY')
  }
}),

Vue.filter('formatBoolean', function(value) {
  if (value) {
    return 'Yes'
  }
  return 'No'
}),

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
