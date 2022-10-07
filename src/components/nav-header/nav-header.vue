<template>
  <div class="nav-header">
    <!-- 菜单展开收缩按钮 -->
    <el-icon size="24px" v-if="!isFold" @click="foldChange">
      <Fold />
    </el-icon>
    <el-icon size="24px" v-else @click="foldChange">
      <Expand />
    </el-icon>
    <!-- 头部导航显示 -->
    <div class="menu-content">
      <!-- 左侧面包屑 -->
      <breadcrumb :breadcrumbs="breadcrumbs">
        {{ breadcrumbs }}
      </breadcrumb>
      <!-- 右侧用户下拉菜单 -->
      <NavHeaderUserInfo></NavHeaderUserInfo>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import NavHeaderUserInfo from './nav-header-userInfo.vue'
import Breadcrumb from '@/base-ui/breadcrumb/index'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumb } from '@/utils/map-menus'

export default defineComponent({
  components: { NavHeaderUserInfo, Breadcrumb },
  emits: ['foldChange'],
  setup(props, { emit }) {
    // 菜单折叠
    const isFold = ref(false)
    const foldChange = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    // 面包屑菜单 -> 根据url路径
    const store = useStore()
    const userMenu = computed(() => store.state.login.userMenu)
    const route = useRoute()
    // 每次点击菜单，当前路由会发生改变
    const currentPath = computed(() => route.path)
    // 面包屑数据会变化
    const breadcrumbs = computed(() => {
      return pathMapBreadcrumb(userMenu.value, currentPath.value)
    })

    return {
      isFold,
      foldChange,
      breadcrumbs
    }
  }
})
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  height: 100%;
  align-items: center;

  .el-icon {
    cursor: pointer;
  }
  .menu-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-left: 10px;
  }
}
</style>
