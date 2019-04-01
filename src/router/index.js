import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    redirect: 'home',
    component: Layout,
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index'),
        name: 'Home'
      },
      {
        path: '/login/:type',
        component: () => import('@/views/login/index'),
        name: 'Login',
        hidden: true
      }
    ]
  },
  {
    path: '/vote',
    component: Layout,
    name: 'Vote',
    redirect: '/vote/list/0',
    children: [
      {
        path: 'list/:id(\\d+)',
        name: 'VoteList',
        component: () => import('@/views/vote/list')
      },
      {
        path: 'detail/:id(\\d+)',
        name: 'VoteDetail',
        component: () => import('@/views/vote/detail')
      }
    ]
  }
]

export default new Router({
  routes: constantRouterMap
})
