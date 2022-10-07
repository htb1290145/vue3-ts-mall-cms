import { createStore, Store, useStore as useVuexStore } from 'vuex'
import type { IRootState, IStoreType } from './type'
// 模块化
import login from './login/login'
import system from './main/system/system'

const store = createStore<IRootState>({
  state: () => {
    return {
      account: 'htb'
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    system
  }
})
// main.ts中加载缓存的数据
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
