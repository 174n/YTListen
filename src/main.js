import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from './App.vue'
import Routes from './routes'

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
    routes: Routes
});

new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
  data () {
    return {
      // corsProxy: "https://crossorigin.me/"
      // corsProxy: "https://cors-anywhere.herokuapp.com/"
      corsProxy: "http://f.url.ph/cors/?"
    }
  }
});