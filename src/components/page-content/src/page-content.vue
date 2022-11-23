<template>
  <div class="page-content">
    <htb-table
      :tableData="tableData"
      :dataTotal="tableDataCount"
      v-bind="tableConfig"
      v-model:page="pageInfo"
    >
      <!-- 固定插槽 -->
      <!-- 1.header部分的插槽 -->
      <template #headerHandle>
        <el-button v-if="isCreate" type="primary" @click="handleNewClick">{{
          headerHandleBtnName
        }}</el-button>
      </template>

      <!-- 2.table列中的插槽 -->
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
      <template #handle="scope">
        <el-button
          v-if="isUpdate"
          type="primary"
          @click="handleEditClick(scope.row)"
          >编辑</el-button
        >
        <el-button
          v-if="isDelete"
          type="primary"
          @click="handleDeleteClick(scope.row)"
          >删除</el-button
        >
      </template>

      <!-- 动态插槽：跨组件插槽的中间动态插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </htb-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import HtbTable from '@/base-ui/table/index'
import { usePermission } from '@/hooks/use-permissions'

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
    },
    headerHandleBtnName: {
      type: String
    }
  },
  emits: ['newBtnClick', 'editBtnClick'],
  // setup只会调用一次，类似于created
  setup(props, { emit }) {
    const store = useStore()
    //双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })

    // 0 获取用户按钮权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // 1.发送网络请求：Vuex的actions中发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        // pageName:决定网络请求的路径，由具体页面传递过来
        pageName: props.pageName,
        queryInfo: {
          // offset = currentPage * pageSize
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 2.从vuex中获取数据
    const tableData = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const tableDataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    // 3.分页器相关
    // 监听分页器数据pageInfo,改变时重新发起网络请求
    watch(pageInfo.value, () => {
      getPageData()
      // 将pageInfo保存至Vuex
      // store.commit('system/changeQueryInfo', {
      //   queryInfo: {
      //     // offset = currentPage * pageSize
      //     offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      //     size: pageInfo.value.pageSize
      //   }
      // })
    })

    // 4.获取其他的动态插槽名称
    const otherPropSlots = props.tableConfig?.propList.filter((item: any) => {
      if (item.slotName === 'status') return false
      if (item.slotName === 'createAt') return false
      if (item.slotName === 'updateAt') return false
      if (item.slotName === 'handle') return false
      return true
    })

    // 控制dailog显示与否
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    // 5.table中的删除
    const handleDeleteClick = (item: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }

    // 6.table中的编辑
    // item === scope.row
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }
    return {
      pageInfo,
      getPageData,
      tableData,
      tableDataCount,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style scoped></style>
