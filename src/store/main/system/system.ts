import { Module } from 'vuex'
import { IRootState } from '@/store/type'
import { getAllUserList } from '@/service/mian/system/system'

// 路径映射
const pageUrlMap: any = {
  user: 'users/list',
  role: 'role/list'
}

export interface systemState {
  userList: any[]
  userCount: number
  roleList: any[]
  roleCount: number
}
const systemModule: Module<systemState, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  getters: {
    // 利用getter返回一个函数
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  mutations: {
    changeUserList(state, list: any[]) {
      state.userList = list
    },
    changeUserCount(state, totalCount: number) {
      state.userCount = totalCount
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, totalCount: number) {
      state.roleCount = totalCount
    }
  },
  // 发送网络请求在actions中
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 一、获取pageUrl
      const pageName = payload.pageName
      // 1.公司规范接口
      // const pageUrl = `${pageName}/list`
      // 2.switch形式
      // let pageUrl = ''
      // switch (pageName) {
      //   case 'users':
      //     pageUrl = 'api/users/list'
      //     break
      //   case 'role':
      //     pageUrl = 'api/users/list'
      //     break
      // }
      // 3.映射形式
      const pageUrl = pageUrlMap[pageName]
      // 二、页面发送请求
      const userListResult = await getAllUserList(pageUrl, payload.queryInfo)

      // 三、将数据存储在state中
      const { list, totalCount } = userListResult.data
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1).toLowerCase()
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    }
  }
}

export default systemModule
