<template>
  <div class="role">
    <!-- 搜索部分 -->
    <div class="search">
      <page-search :searchFormConfig="searchFormConfig"></page-search>
    </div>

    <!-- 表格区域 -->
    <div class="content">
      <page-content
        :tableConfig="tableConfig"
        pageName="role"
        headerHandleBtnName="新建角色"
        @newBtnClick="handleNewClick"
        @editBtnClick="handleEditClick"
      >
      </page-content>
    </div>
    <page-dialog
      ref="pageDialogRef"
      pageName="role"
      :dailog-config="dialogConfig"
      :defaultInfo="defaultInfo"
      :other-info="otherInfo"
    >
      <el-tree
        ref="roleTreeRef"
        :data="menus"
        node-key="id"
        :props="{ children: 'children', label: 'name' }"
        highlight-current
        show-checkbox
        check-on-click-node
        expand-on-click-node
        @check="handleCheckChange"
      />
      <!-- <el-tree
        :ref="roleTreeRef"
        :data="menus"
        show-checkbox
        node-key="id"
        :props="{ children: 'children', label: 'name' }"
        @check="handleCheckChange"
      /> -->
    </page-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from 'vuex'
import { ElTree } from 'element-plus'
// 公共表单组件
// 搜索表单配置文件
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageDialog from '@/components/page-dialog'

import { searchFormConfig } from './config/search.config'
import { tableConfig } from './config/table.config'
import { dialogConfig } from './config/dailog.config'
// hooks
import { usePageDialog } from '@/hooks/use-page-dailog'
// utils
import { mapMenusToLeafKeys } from '@/utils/map-menus'

export default defineComponent({
  name: 'role',
  components: { PageSearch, PageContent, PageDialog },
  setup() {
    // el-tree
    // data
    const store = useStore()
    const menus = computed(() => store.state.entireMenu)
    // el-tree选中事件 -> 传递数据给dailog发送网络请求
    const otherInfo = ref({})
    const handleCheckChange = (item: any, checkedObject: any) => {
      const checkedKeys = checkedObject.checkedKeys
      const halfCheckedKeys = checkedObject.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    // 节点回显
    const roleTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallBack = (item: any) => {
      const leafKeys = mapMenusToLeafKeys(item.menuList)
      // nextTick 确保ref获取8
      nextTick(() => {
        roleTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }

    // PageDialog
    const [pageDialogRef, defaultInfo, handleNewClick, handleEditClick] =
      usePageDialog(undefined, editCallBack)
    return {
      searchFormConfig,
      tableConfig,
      dialogConfig,
      pageDialogRef,
      roleTreeRef,
      defaultInfo,
      otherInfo,
      handleNewClick,
      handleEditClick,
      menus,
      handleCheckChange
    }
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

  .el-tree {
    margin-left: 20px;
  }
}
</style>
