<template>
  <div class="user">
    <!-- 搜索部分 -->
    <div class="search">
      <page-search :searchFormConfig="searchFormConfig"></page-search>
    </div>

    <!-- 表格区域 -->
    <div class="content">
      <htb-table
        :tableData="userList"
        :propList="propList"
        :showIndexColumn="showIndexColumn"
        :showSelectionColumn="showSelectionColumn"
        :title="userTitle"
        @selection-change="selectionChange"
      >
        <!-- 1.标题部分的插槽 -->
        <template #headerHandle>
          <el-button type="primary">表格处理</el-button>
        </template>
        <!-- 2.列中的插槽 -->
        <!-- 状态列插槽 -->
        <template #enable="scope"
          ><el-button plain :type="scope.row.enable ? 'success' : 'danger'">{{
            scope.row.enable ? '启用' : '禁用'
          }}</el-button>
        </template>
        <!-- 时间列插槽 -->
        <template #createAt="scope">
          <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
        </template>
        <template #updateAt="scope">
          <strong>{{ $filters.formatTime(scope.row.updateAt) }}</strong>
        </template>
      </htb-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
// 公共表单组件
import PageSearch from '@/components/page-search'
import HtbTable from '@/base-ui/table/index'
// user页面的表单配置文件
import { searchFormConfig } from './config/search.config'
// vuex
import { useStore } from 'vuex'

export default defineComponent({
  name: 'user',
  components: { PageSearch, HtbTable },
  setup() {
    // Vuex 发送网络请求得到数据
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageUrl: '/users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    const userList = computed(() => store.state.system.userList)

    const propList = [
      { prop: 'name', label: '用户名', minWidth: '40' },
      { prop: 'realname', label: '真实姓名', minWidth: '40' },
      { prop: 'cellphone', label: '电话号码', minWidth: '80' },
      { prop: 'enable', label: '状态', minWidth: '40', slotName: 'enable' },
      {
        prop: 'createAt',
        label: '创建时间',
        minWidth: '40',
        slotName: 'createAt'
      },
      {
        prop: 'updateAt',
        label: '更新时间',
        minWidth: '40',
        slotName: 'updateAt'
      }
    ]
    const showSelectionColumn = true
    const showIndexColumn = true
    const userTitle = '用户列表'
    // table组件多选值
    const selectionChange = (value: any) => {
      console.log(value)
    }
    return {
      searchFormConfig,
      userList,
      propList,
      showSelectionColumn,
      showIndexColumn,
      userTitle,
      selectionChange
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
