import Vue from 'vue'
import 'babel-polyfill'
import App from './app.vue'
import VueLazyload from 'vue-lazyload'
import router from './router'

Vue.use(VueLazyload,  {
    preLoad: 1.3,
    loading: 'https://static.sunlands.com/wechat-management/prod/openCourse/assets/v2.2/course_bg.png',
    attempt: 3,
    listenEvents: [ 'scroll' ]
});

window.onload = function () {
    (<any>window).viewportUnitsBuggyfill.init({
        hacks: (<any>window).viewportUnitsBuggyfillHacks
    });
}


new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})