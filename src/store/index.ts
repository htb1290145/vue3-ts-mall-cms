import { createStore } from 'vuex'

import type { IRootState } from './type'
// 模块化
import login from './login/login'

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
    login
  }
})
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export default store
