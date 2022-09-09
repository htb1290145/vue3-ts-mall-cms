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
      <el-breadcrumb separator="/">
        <!-- 一级菜单 -->
        <el-breadcrumb-item :to="{ path: '/main' }"
          >一级菜单</el-breadcrumb-item
        >
        <!-- 二级菜单 -->
        <el-breadcrumb-item :to="{ path: '/main/system/user' }">
          二级菜单</el-breadcrumb-item
        >
      </el-breadcrumb>
      <!-- 右侧下拉菜单 -->
      <NavHeaderUserInfo></NavHeaderUserInfo>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavHeaderUserInfo from './nav-header-userInfo.vue'

export default defineComponent({
  components: { NavHeaderUserInfo },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const foldChange = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    return {
      isFold,
      foldChange
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
