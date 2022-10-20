<template>
  <div class="menu">
    <div class="content">
      <page-content :tableConfig="tableConfig" pageName="menu"></page-content>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import { tableConfig } from './config/table.config'

export default defineComponent({
  name: 'v-menu',
  components: { PageContent },
  setup() {
    return { tableConfig }
  }
})
</script>

<style lang="less" scoped>
.menu {
  padding: 20px 0;
  .content {
    margin: 20px 0;
    padding: 20px;
    border-top: 20px solid #f5f5f5;
  }
}
</style>
