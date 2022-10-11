<template>
  <div class="user">
    <!-- 搜索部分 -->
    <div class="search">
      <page-search :searchFormConfig="searchFormConfig"></page-search>
    </div>

    <!-- 表格区域 -->
    <div class="content">
      <page-content :tableConfig="tableConfig" pageName="user"></page-content>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// 公共表单组件
// 搜索表单配置文件
import PageSearch from '@/components/page-search'
import { searchFormConfig } from './config/search.config'
import PageContent from '@/components/page-content'
import { tableConfig } from './config/table.config'

export default defineComponent({
  name: 'user',
  components: { PageSearch, PageContent },
  setup() {
    // 2.分页器
    // 2.1 size改变
    // const pageSizeChange = (newValue: any) => {
    //   console.log('pageSize' + newValue)
    //   pageSize = newValue
    //   // 重新发送请求表格数据
    //   store.dispatch('system/getPageListAction', {
    //     pageUrl: '/users/list',
    //     queryInfo: {
    //       offset: 0,
    //       size: newValue
    //     }
    //   })
    // }
    // // 2.2 当前页数改变
    // const currentChange = (newValue: any) => {
    //   console.log('current' + newValue)
    //   console.log('pageSize' + pageSize.value)
    //   // 重新发送请求表格数据
    //   store.dispatch('system/getPageListAction', {
    //     pageUrl: '/users/list',
    //     queryInfo: {
    //       offset: newValue,
    //       size: pageSize
    //     }
    //   })
    // }
    return {
      searchFormConfig,
      tableConfig
      // pageSizeChange,
      // currentChange
    }
  }
})
</script>

<style lang="less" scoped>
.user {
  padding: 20px 0;
  .content {
    margin: 20px 0;
    padding: 20px;
    border-top: 20px solid #f5f5f5;
  }
}
</style>
