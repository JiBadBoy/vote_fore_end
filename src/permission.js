import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import {getUser} from '@/utils/auth'

NProgress.configure({showSpinner: false})

const whiteList = ['/', '/login/mobile', '/login/card', '/home'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getUser()) {
    next()
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/') // 否则全部重定向到首页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
