<template>
  <div class="dashboard">
    <el-row :gutter="10" class="content-row">
      <el-col :span="7">
        <el-card title="分类商品数量(饼图)">
          <template #card-content>
            <pie-echart :pieData="categoryProductCount"></pie-echart>
          </template>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card title="不同城市销量（玫瑰图）">
          <template #card-content>
            <pie-roes-type-echart
              :pieRoseData="goodsAddressSale"
            ></pie-roes-type-echart>
          </template>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card title="不同城市销量（中国地图）">
          <template #card-content>
            <china-map-echart
              :china-map-data="goodsAddressSale"
            ></china-map-echart>
          </template>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <el-card title="分类商品的收藏">
          <template #card-content>
            <line-echart v-bind="categoryProductFavor"></line-echart>
          </template>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card title="分类商品的销量">
          <template #card-content>
            <bar-echart v-bind="categoryProductSale"></bar-echart>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

// 公共组件
import ElCard from '@/components/el-card'
import {
  PieEchart,
  BarEchart,
  LineEchart,
  PieRoesTypeEchart,
  ChinaMapEchart
} from '@/components/page-echart/index'

export default defineComponent({
  name: 'dashboard',
  components: {
    ElCard,
    PieEchart,
    BarEchart,
    LineEchart,
    PieRoesTypeEchart,
    ChinaMapEchart
  },
  setup() {
    // 请求dashboard页面的初始数据 setup === create
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction', '/goods/category/count')
    store.dispatch('dashboard/getDashboardDataAction', '/goods/category/sale')
    store.dispatch('dashboard/getDashboardDataAction', '/goods/category/favor')
    store.dispatch('dashboard/getDashboardDataAction', '/goods/sale/top10')
    store.dispatch('dashboard/getDashboardDataAction', '/goods/address/sale')
    store.dispatch('dashboard/getDashboardDataAction', '/goods/amount/list')

    // 分类商品数量(饼图)
    const categoryProductCount = computed(() => {
      return store.state.dashboard.categoryProductCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })

    // 分类商品的收藏
    const categoryProductFavor = computed(() => {
      const xLabels: string[] = []
      const values: number[] = []
      const categoryProductFavor = store.state.dashboard.categoryProductFavor
      for (const item of categoryProductFavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }
      return { xLabels, values }
    })

    // 分类商品销量
    const categoryProductSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryProductSale = store.state.dashboard.categoryProductSale
      for (const item of categoryProductSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return { xLabels, values }
    })

    // 商品地区销量
    const goodsAddressSale = computed(() => {
      return store.state.dashboard.goodsAddressSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })

    // 不同城市销量

    return {
      categoryProductCount,
      goodsAddressSale,
      categoryProductSale,
      categoryProductFavor
    }
  }
})
</script>

<style lang="less" scoped>
.dashboard {
  padding: 40px 40px;
  .el-row {
    margin-bottom: 20px;
  }
}
</style>
