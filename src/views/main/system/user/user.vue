<template>
  <div class="user">
    <!-- 搜索部分 -->
    <div class="search">
      <page-search
        :searchFormConfig="searchFormConfig"
        @resetBtnClick="handleResetClick"
        @searchBtnClick="handleSearchClick"
      ></page-search>
    </div>

    <!-- 表格区域 -->
    <div class="content">
      <page-content
        :tableConfig="tableConfig"
        pageName="users"
        :headerHandleBtnName="'新建用户'"
        @newBtnClick="handleNewClick"
        @editBtnClick="handleEditClick"
      ></page-content>
    </div>
    <!-- 设计page-content与page-dialog两个组件间的通讯：pageContent的emit => user的函数接收 => pageDialogRef调用内部 -->
    <page-dialog
      ref="pageDialogRef"
      :dailog-config="dailogConfigRef"
      :defaultInfo="defaultInfo"
    ></page-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

// 公共表单组件
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageDialog from '@/components/page-dialog'

// 配置文件
import { searchFormConfig } from './config/search.config'
import { tableConfig } from './config/table.config'
import { dialogConfig } from './config/dailog.config'

// hooks
import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageDialog } from '@/hooks/use-page-dailog'

export default defineComponent({
  name: 'user',
  components: { PageSearch, PageContent, PageDialog },
  setup() {
    // 元组方式
    // pageContent
    const [pageContentRef, handleResetClick, handleSearchClick] =
      usePageSearch()

    // pageDialog
    // 1.处理新建用户的form显示密码input，而编辑用户的form不显示密码input
    const newCallBack = () => {
      const passwordItem = dialogConfig.formItems.find(
        (item) => item.field === 'password'
      )
      if (passwordItem) {
        passwordItem.isHidden = false
      }
    }
    const editCallBack = () => {
      const passwordItem = dialogConfig.formItems.find(
        (item) => item.field === 'password'
      )
      if (passwordItem) {
        passwordItem.isHidden = true
      }
    }

    // 2.动态添加部门和角色列表:请求数据是异步操作，可能此时store.state.entireDepartment还没有数据
    // 解决办法：computed包裹后返回
    const store = useStore()
    const dailogConfigRef = computed(() => {
      const departmentItem = dialogConfig.formItems.find(
        (item) => item.field === 'department'
      )
      if (departmentItem) {
        departmentItem.options = store.state.entireDepartment.map(
          (item: any) => {
            return { label: item.name, value: item.id }
          }
        )
      }
      const roleItem = dialogConfig.formItems.find(
        (item) => item.field === 'role'
      )
      if (roleItem) {
        roleItem.options = store.state.entireRole.map((item: any) => {
          return { label: item.name, value: item.id }
        })
      }
      return dialogConfig
    })

    const [pageDialogRef, defaultInfo, handleNewClick, handleEditClick] =
      usePageDialog(newCallBack, editCallBack)

    return {
      searchFormConfig,
      tableConfig,
      dailogConfigRef,
      pageContentRef,
      handleResetClick,
      handleSearchClick,
      pageDialogRef,
      defaultInfo,
      handleNewClick,
      handleEditClick
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
