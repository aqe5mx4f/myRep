import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard')
    },
    {
      path: '/Channel/:hid',
      name: 'Channel',
      component: () => import('@/views/Channel')
    },
    {
      path: '/DetailInfo/:info',
      name: '/DetailInfo',
      component:() => import('@/views/DetailInfo')
    }
  ]
})
