<template>
  <div class="role">
    <!-- 搜索部分 -->
    <div class="search">
      <page-search :searchFormConfig="searchFormConfig"></page-search>
    </div>

    <!-- 表格区域 -->
    <div class="content">
      <page-content :tableConfig="tableConfig" pageName="role"></page-content>
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
  name: 'role',
  components: { PageSearch, PageContent },
  setup() {
    return { searchFormConfig, tableConfig }
  }
})
</script>

<style lang="less" scoped>
.role {
  padding: 20px 0;
  .content {
    margin: 20px 0;
    padding: 20px;
    border-top: 20px solid #f5f5f5;
  }
}
</style>
