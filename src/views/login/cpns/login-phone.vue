<template>
  <div class="login-phone">
    <el-form :model="phoneForm" :rules="phoneRules">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="phoneForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="phoneForm.code"></el-input>
          <el-button type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { phoneRules } from '../config/rules-config'

export default defineComponent({
  setup() {
    const phoneForm = reactive({
      phone: '',
      code: ''
    })

    return {
      phoneForm,
      phoneRules
    }
  }
})
</script>

<style lang="less" scoped>
.get-code {
  display: flex;
  .el-button {
    margin-left: 10px;
  }
}
</style>
