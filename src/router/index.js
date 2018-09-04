import Vue from 'vue'
import Router from 'vue-router'


let routes, router;
Vue.use(Router);


routes = [
    {
        path: '/news',
        name: 'news',
        component: () => import('screens/news/news'),
        meta: {
            title: '资讯详情'
        }
    },
    {
        path: '/apply',
        name: 'apply',
        component: () => import('screens/news/news'),
        meta: {
            title: '报名条件'
        }
    },
    {
        path: '/shareNews',
        name: 'shareNews',
        component: () => import('screens/share/shareNews'),
        meta: {
            title: '伴你考教师--轻松高效get教师资格证'
        }
    },
    {
        path: '/shareQuestion',
        name: 'shareQuestion',
        component: () => import('screens/share/shareQuestion'),
        meta: {
            title: '伴你考教师--轻松高效get教师资格证'
        }
    },
    {
        path: '/shareStruct',
        name: 'shareStruct',
        component: () => import('screens/share/shareStruct'),
        meta: {
            title: '伴你考教师--轻松高效get教师资格证'
        }
    },
    {
        path: '/shareRehearse',
        name: 'shareRehearse',
        component: () => import('screens/share/shareRehearse'),
        meta: {
            title: '伴你考教师--轻松高效get教师资格证'
        }
    },
    {
        path: '/protocol',
        name: 'protocol',
        component: () => import('screens/protocol/protocol'),
        meta: {
            title: '用户协议'
        }
    },
    {
        path: '/flow',
        name: 'flow',
        component: () => import('screens/flow/flow'),
        meta: {
            title: '面试流程'
        }
    },
    {
        path: '/hitMole',
        name: 'hitMole',
        component: () => import('screens/hitMole/hitMole'),
        meta: {
            title: '打到面试官'
        }
    },
    {
        path: '/hitMolePrize',
        name: 'hitMolePrize',
        component: () => import('screens/hitMole/hitMolePrize'),
        meta: {
            title: '打到面试官'
        }
    },
];
router = new Router({
    routes
});
router.beforeEach((to, from, next) => {
    if (to.name !== "news") {
        document.title = to.meta.title;
    }
    next()
});
export default router;
