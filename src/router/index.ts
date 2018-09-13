import Vue from 'vue'
import Router from 'vue-router'


let routes, router;
Vue.use(Router);
function isInWechat(): boolean {
    let ua = navigator.userAgent.toLowerCase();
    let existUa = ua.match(/MicroMessenger/i)
    if ( existUa && existUa.toString() === "micromessenger") {
        return true;
    } else {
        return false;
    }
}
let isWechat: boolean = true
routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('screens/index/index'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/status',
        name: 'status',
        component: () => import('screens/activityStatus/index'),
        meta: {
            title: '提示'
        }
    },
    {
        path: '/success',
        name: 'success',
        component: () => import('screens/success/success'),
        meta: {
            title: '支付成功'
        }
    }
];

router = new Router({
    routes
});
router.beforeEach((to, from, next) => {
    // MtaH5.pgv()
    if(to.name === 'index'){
        MtaH5.clickStat('pageview')
    }
    if(to.name === 'success'){
        MtaH5.clickStat('buyed')
    }
    if(!isWechat && to.name!=='status'){
        next({path: '/status', query:{enterType: 'notWechat'}})
    } else {
        next()
    }
});
export default router;
