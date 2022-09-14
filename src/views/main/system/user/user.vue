<template>
  <div class="user">
    <!-- 搜索区域 -->
    <div class="search">
      <!-- v-bind绑定多个属性 -->
      <htb-form v-bind="formConfig"></htb-form>
    </div>
    <!-- 表格区域 -->
    <div class="content">2</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HtbForm from '@/base-ui/form'
// 表单配置文件
import { formConfig } from './config/search.config'

export default defineComponent({
  name: 'user',
  components: {
    HtbForm
  },
  setup() {
    return {
      formConfig
    }
  }
})
</script>

<style lang="less" scoped>
.user {
  padding: 20px 20px;
}
</style>
