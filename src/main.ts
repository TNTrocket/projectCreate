import Vue from 'vue'
import 'babel-polyfill'
import App from './app.vue'
import VueLazyload from 'vue-lazyload'
import router from './router'

Vue.use(VueLazyload)

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})