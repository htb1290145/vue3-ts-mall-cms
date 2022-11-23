import { createStore, Store, useStore as useVuexStore } from 'vuex'

import type { IRootState, IStoreType } from './type'

import { getPageListData } from '@/service/mian/system/system'

// 模块化
import login from './login/login'
import system from './main/system/system'
import dashboard from './main/analysis/dashboard'

const store = createStore<IRootState>({
  state: () => {
    return {
      account: 'htb',
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  getters: {},
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 1.请求部门、角色、菜单数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data

      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data

      const menuResult = await getPageListData('/menu/list', {
        offset: 0,
        size: 1000
      })
      const { list: menuList } = menuResult.data

      // 2.保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

// main.ts中加载缓存的数据。此函数在main.ts中，会自动执行
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  // 请求网页的初始数据，需保证token已经拿到：网络请求是异步的，可能存在token尚未拿到，getInitialDataAction请求不到数据。
  store.dispatch('getInitialDataAction')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
