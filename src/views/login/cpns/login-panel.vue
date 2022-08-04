<template>
  <div class="login-panel">
    <h1>后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="loginWay">
      <!-- 账号登录 -->
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Avatar /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <!-- 账号登录区域 -->
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <!-- 密码登录 -->
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <!-- 手机登录区域 -->
        <login-phone></login-phone>
      </el-tab-pane>
    </el-tabs>
    <!-- 底部区域 -->
    <div class="login-control">
      <!-- 记住密码 -->
      <el-checkbox v-model="isKeepPassword" label="记住密码" size="large" />
      <!-- 忘记密码 -->
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" @click="handleLoginClick">立即登录</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    // 登录方式选择
    const loginWay = ref<string>('account')
    // 是否记住密码
    const isKeepPassword = ref<boolean>(true)

    // 获取组件对象Ref
    const accountRef = ref<InstanceType<typeof LoginAccount>>()

    // 登录按钮
    const handleLoginClick = () => {
      // 1.账号登录
      if (loginWay.value === 'account') {
        // 调用子组件对象中的方法
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        // 2.手机登录
      }
    }
    return {
      loginWay,
      isKeepPassword,
      handleLoginClick,
      accountRef
    }
  }
})
</script>

<style lang="less" scoped>
.login-panel {
  margin-bottom: 130px;
  width: 320px;
  h1 {
    text-align: center;
  }
  .el-tabs__header is-top {
    width: 100%;
  }
  .custom-tabs-label span {
    vertical-align: middle;
    margin-left: 4px;
  }
  .custom-tabs-label .el-icon {
    vertical-align: middle;
  }
  .login-control {
    display: flex;
    justify-content: space-between;
  }
  .el-button {
    width: 100%;
    height: 40px;
  }
}
</style>
