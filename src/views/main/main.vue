<template>
  <div class="main">
    <el-container class="main-content">
      <!-- 左侧边菜单 -->
      <el-aside :width="!isCollapse ? '210px' : '60px'">
        <nav-menu :collapse="isCollapse" />
      </el-aside>
      <!-- 右侧内容 -->
      <el-container class="page">
        <!-- 顶部导航 -->
        <el-header class="page-header">
          <nav-header @foldChange="handleFoldChange"></nav-header>
        </el-header>
        <!-- 内容区域 -->
        <el-main class="page-content">
          <div class="page-info">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavMenu from '@/components/nav-menu/nav-menu.vue'
import NavHeader from '@/components/nav-header/nav-header.vue'

import emitter from '@/utils/mitt'

export default defineComponent({
  components: { NavMenu, NavHeader },
  setup(props) {
    const isCollapse = ref(false)
    const handleFoldChange = (isFold: boolean) => {
      isCollapse.value = isFold
      // echart重绘:事件总线
      emitter.emit('isResize')
    }

    return {
      isCollapse,
      handleFoldChange
    }
  }
})
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    color: white;
    transition: width 0.3s linear;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
      display: none;
    }
  }
  .main-content,
  .page {
    height: 100%;
    .el-header {
      height: 48px !important;
    }
    .page-content {
      height: calc(100% - 48px);
      color: #333;
      text-align: center;
      background-color: #f0f2f5;

      .page-info {
        background-color: white;
        border-radius: 5px;
      }
    }
  }
}
</style>
