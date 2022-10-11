<template>
  <div class="page-content">
    <htb-table
      :tableData="tableData"
      :total="tableDataCount"
      v-bind="tableConfig"
    >
      <!-- 1.header部分的插槽 -->
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
      <!-- 操作列插槽 -->
      <template #handle>
        <el-button type="info">删除</el-button>
        <el-button type="info">编辑</el-button>
      </template>
    </htb-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import HtbTable from '@/base-ui/table/index'

export default defineComponent({
  components: { HtbTable },
  props: {
    tableConfig: {
      type: Object,
      default: () => ({}),
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    // 初始页面：Vuex的actions中 发送网络请求得到数据
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      // pageName:决定网络请求的路径，由具体页面传递过来
      pageName: props.pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    // 数据
    const tableData = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const tableDataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )
    return { tableData, tableDataCount }
  }
})
</script>

<style scoped></style>
