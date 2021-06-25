import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Dashboard',
            component: () =>
                import ('@/views/Dashboard')
        },
        {
            path: '/test',
            name: 'test',
            component: () =>
                import ('@/views/test')
        },
        {
            path: '/Channel/:hid',
            name: 'Channel',
            component: () =>
                import ('@/views/Channel')
        },
        {
            path: '/DetailInfo/:info',
            name: 'DetailInfo',
            component: () =>
                import ('@/views/DetailInfo')
        },
        {
            path: '/Search/:SInfo',
            name: 'Search',
            component: () =>
                import ('@/views/Search')
        },
        {
            path: '/Learn/:data',
            name: '/Learn',
            component: () =>
                import ('@/views/Learn/index'),
            children: [{
                path: '/',
                name: '/announce',
                component: () =>
                    import ('@/views/learn/announce/index')
            }]
        }
    ]
})