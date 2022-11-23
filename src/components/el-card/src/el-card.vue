<template>
  <div class="el-card">
    <el-card shadow="hover">
      <template #header>
        <div class="el-card-header">
          <span>{{ title }}</span>
        </div>
      </template>
      <div class="card-content">
        <slot name="card-content"></slot>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    title: { type: String, default: '卡片标题' }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
// :deep()
/deep/ .el-card__header {
  padding: 10px 10px;

  .el-card-header {
    text-align: left;
  }
}
</style>
