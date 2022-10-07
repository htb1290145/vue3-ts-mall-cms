import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// 缓存
import localCache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    // 跳转到首页
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "views" */ '@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () =>
      import(/* webpackChunkName: "views" */ '@/views/main/main.vue')
    // 动态路由,注册所有
    // children: [
    //   {
    //     path: '/main/system',
    //     component: () =>
    //       import(/* webpackChunkName: "views" */ '@/views/main/cpns/system.vue')
    //     // component: system
    //   }
    // ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('@/views/notfound/notfound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 导航守卫。
router.beforeEach((to) => {
  // 如果要去的页面是除了登录页面之外的页面，就必须是已经登录的状态（有token）
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
  // 页面重定向，如果去到主页，就跳转到firstMenu
  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
