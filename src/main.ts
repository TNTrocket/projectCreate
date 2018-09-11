import Vue from 'vue'
import 'babel-polyfill'
import App from './app.vue'
import router from './router'

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})