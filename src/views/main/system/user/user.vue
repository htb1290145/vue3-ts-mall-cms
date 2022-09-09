<template>
  <div class="user">
    <div class="search">
      <htb-form :form-item="formItems"></htb-form>
    </div>
    <div class="content">2</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HtbForm, { IFormItem } from '@/base-ui/form'

export default defineComponent({
  name: 'user',
  components: {
    HtbForm
  },
  setup() {
    // 配置文件
    const formItems: IFormItem[] = [
      { label: '用户名', rules: [], placeholder: '请输入用户名' },
      { label: '密码', rules: [], placeholder: '请输入密码' },
      { label: '喜欢的运动', rules: [], placeholder: '请选择喜欢的运动' },
      { label: '创建时间', rules: [], placeholder: '请选择创建时间' }
    ]
    return {
      formItems
    }
  }
})
</script>

<style lang="less" scoped>
.user {
  padding: 20px 20px;
}
</style>
