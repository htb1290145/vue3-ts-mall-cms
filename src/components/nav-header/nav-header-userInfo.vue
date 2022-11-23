<template>
  <div class="nav-header-userInfo">
    <!-- 菜单外部 -->
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        />
        <!-- 用户名 -->
        <span class="title">{{ userName }}</span>
      </span>
      <!-- 菜单内部 -->
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="quitLogin">
            <el-icon><CircleClose /></el-icon>
            退出登录
          </el-dropdown-item>
          <el-dropdown-item divided> 用户名 </el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import localCache from '@/utils/cache'
import router from '@/router'

export default defineComponent({
  setup() {
    const store = useStore()
    const userName = computed(() => store.state.login.userInfo.name)
    // dropDown的事件
    const handleCommand = (command: string | number | object) => {
      console.log(command)
      console.log('quitLogin')
      // 退出登录 -> 1.清除localStorage中的token 2.跳转至login
      localCache.deleteCache('token')
      router.push('/login')
    }
    return { userName, handleCommand }
  }
})
</script>

<style lang="less" scoped>
.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  .title {
    margin-left: 4px;
  }
}
</style>
