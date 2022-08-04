<template>
  <div class="login-account">
    <el-form
      label-width="60px"
      :model="accountForm"
      :rules="accountRules"
      ref="accountRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="accountForm.name" clearable />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="accountForm.password"
          type="password"
          show-password
          clearable
          @keyup.enter="loginAction"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { accountRules } from '../config/rules-config'
import { ElForm } from 'element-plus'
import { useStore } from 'vuex'
// utils工具，缓存
import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    // vuex
    const store = useStore()
    // 创建Ref
    const accountRef = ref<InstanceType<typeof ElForm>>()

    // 表单数据对象
    const accountForm = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    // 登录逻辑
    const loginAction = (isKeepPassword: boolean) => {
      accountRef.value?.validate((valid) => {
        if (valid) {
          // 1.判断是否需要记住密码
          if (isKeepPassword) {
            // 本地缓存
            localCache.setCache('name', accountForm.name)
            localCache.setCache('password', accountForm.password)
          } else {
            // 无需记住，则清除缓存
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          // 2.登录验证逻辑
          store.dispatch('login/accountLoginAction', { ...accountForm })
        }
      })
    }

    return {
      accountForm,
      accountRules,
      loginAction,
      accountRef
    }
  }
})
</script>

<style lang="less" scoped></style>
