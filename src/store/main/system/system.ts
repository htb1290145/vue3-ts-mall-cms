import { Module } from 'vuex'
import { IRootState } from '@/store/type'
import { getPageListData, deletePageData } from '@/service/mian/system/system'

// 路径映射
const pageUrlMap: any = {
  users: 'users/list',
  role: 'role/list',
  goods: 'goods/list',
  menu: 'menu/list'
}

export interface systemState {
  usersList: any[]
  usersCount: number
  roleList: any[]
  roleCount: number
  goodsList: any[]
  goodsCount: number
  menuList: any[]
  menuCount: number
}
const systemModule: Module<systemState, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
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
    changeUsersList(state, list: any[]) {
      state.usersList = list
    },
    changeUsersCount(state, totalCount: number) {
      state.usersCount = totalCount
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, totalCount: number) {
      state.roleCount = totalCount
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list
    },
    changeGoodsCount(state, totalCount: number) {
      state.goodsCount = totalCount
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list
    },
    changeMenuCount(state, totalCount: number) {
      state.menuCount = totalCount
    }
  },
  // 发送网络请求在actions中
  actions: {
    // 获取页面pageContent的数据
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
      const userListResult = await getPageListData(pageUrl, payload.queryInfo)

      // 三、将数据存储在state中
      const { list, totalCount } = userListResult.data
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1).toLowerCase()
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    },

    // 删除
    async deletePageDataAction({ dispatch }, payload: any) {
      // 1.获取pageName和id -> url: 'pageName + id
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`

      // 2.发送删除网络请求
      await deletePageData(pageUrl)

      // 3.删除后重新刷新列表
      dispatch('getPageListAction', {
        pageName,
        queryInfo: { offset: 0, size: 10 }
      })
    }
  }
}

export default systemModule
