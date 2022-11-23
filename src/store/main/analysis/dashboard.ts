import { Module } from 'vuex'
import { IRootState } from '@/store/type'
import { getDashboardData } from '@/service/mian/analysis/dashboard'

export interface IDashboardState {
  categoryProductCount: any[]
  categoryProductSale: any[]
  categoryProductFavor: any[]
  goodsSaleTop10: any[]
  goodsAddressSale: any[]
  goodsAmountList: any[]
}

// 映射
const stateMap: any = {
  '/goods/category/count': 'categoryProductCount',
  '/goods/category/sale': 'categoryProductSale',
  '/goods/category/favor': 'categoryProductFavor',
  '/goods/sale/top10': 'goodsSaleTop10',
  '/goods/address/sale': 'goodsAddressSale',
  '/goods/amount/list': 'goodsAmountList'
}

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      categoryProductCount: [],
      categoryProductSale: [],
      categoryProductFavor: [],
      goodsSaleTop10: [],
      goodsAddressSale: [],
      goodsAmountList: []
    }
  },
  mutations: {
    changeCategoryProductCount(state, data) {
      state.categoryProductCount = data
    },
    changeCategoryProductSale(state, data) {
      state.categoryProductSale = data
    },
    changeCategoryProductFavor(state, data) {
      state.categoryProductFavor = data
    },
    changeGoodsSaleTop10(state, data) {
      state.goodsSaleTop10 = data
    },
    changeGoodsAddressSale(state, data) {
      state.goodsAddressSale = data
    },
    changeGoodsAmountList(state, data) {
      state.goodsAmountList = data
    }
  },
  actions: {
    async getDashboardDataAction(context, payload: any) {
      const result = await getDashboardData(payload)
      const stateData = stateMap[payload]
      const changeName =
        stateData.slice(0, 1).toUpperCase() + stateData.slice(1)
      context.commit(`change${changeName}`, result.data)
    }
  }
}

export default dashboardModule
