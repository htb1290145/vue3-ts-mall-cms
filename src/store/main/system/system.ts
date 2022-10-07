import { Module } from 'vuex'
import { IRootState } from '@/store/type'
import { getAllUserList } from '@/service/mian/system/system'

export interface systemState {
  userList: any[]
  userCount: number
}
const systemModule: Module<systemState, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      userList: [],
      userCount: 0
    }
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, totalCount: number) {
      state.userCount = totalCount
    }
  },
  // 发送网络请求在actions中
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 页面发送请求
      const userListResult = await getAllUserList(
        payload.pageUrl,
        payload.queryInfo
      )
      const { list, totalCount } = userListResult.data
      commit('changeUserList', list)
      commit('changeUserCount', totalCount)
    }
  }
}

export default systemModule
