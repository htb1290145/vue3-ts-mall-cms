import { Module } from 'vuex'
import localCache from '@/utils/cache'
import type { IRootState } from '../type'
import type { IAccount } from '@/service/login/type'
import {
  accountLoginRequest,
  loginUserInfoByIdRequest,
  userMenuByRoleIdRequest
} from '@/service/login/login'
import router from '@/router'
import { mapMenuToRoutes } from '@/utils/map-menus'

export interface loginState {
  token: string
  userInfo: object
  userMenu: object
}

const loginModule: Module<loginState, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      token: '',
      userInfo: {},
      userMenu: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenu(state, userMenu: any) {
      state.userMenu = userMenu
      // 注册动态路由
      // userMenus->routes->router.main.children
      const routes = mapMenuToRoutes(userMenu)
      // 将routes 添加至 main.children
      routes.forEach((route) => {
        // addRoute，给现有的路由添加子路由
        router.addRoute('main', route)
      })
    }
  },
  // 网络请求放入actions
  actions: {
    // 登录验证
    async accountLoginAction({ commit }, payload: IAccount) {
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      // 缓存token至本地，请求拦截器方便使用
      localCache.setCache('token', token)
      // 2.请求用户信息
      const userInfoResult = await loginUserInfoByIdRequest(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      // 缓存用户信息
      localCache.setCache('userInfo', userInfo)
      // 3.获取用户菜单
      const userMenuResult = await userMenuByRoleIdRequest(id)
      const userMenu = userMenuResult.data
      commit('changeUserMenu', userMenu)
      // 缓存用户菜单
      localCache.setCache('userMenu', userMenu)
      // 4.跳到首页
      router.push('/main')
    },
    // Vuex的数据会在网页消失之后刷新，刷新后从缓存中获取
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenu = localCache.getCache('userMenu')
      if (userMenu) {
        commit('changeUserMenu', userMenu)
      }
    }
  }
}

export default loginModule
