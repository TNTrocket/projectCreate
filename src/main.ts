import Vue from 'vue'
import App from './app.vue'
import VueLazyload from 'vue-lazyload'
import router from './router'

Vue.use(VueLazyload,  {
    preLoad: 1.3,
    error: 'https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/detailLoading2.png',
    loading: 'https://static.sunlands.com/wechat-management/prod/mk_mp/h5Activity/detailLoading2.png',
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