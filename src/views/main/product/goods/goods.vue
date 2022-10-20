<template>
  <div class="goods">
    <div class="content">
      <page-content :tableConfig="tableConfig" pageName="goods">
        <!-- 单个页面独有的插槽-跨组件插槽  -->
        <!-- 照片列插槽 -->
        <template #image="scope">
          <el-image
            style="width: 60px; height: 60px"
            :src="scope.row.imgUrl"
            :preview-src-list="[scope.row.imgUrl]"
            fit="cover"
          >
          </el-image>
        </template>
        <template #oldPrice="scope">{{ '¥' + scope.row.oldPrice }}</template>
      </page-content>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import { tableConfig } from './config/table.config'

export default defineComponent({
  name: 'goods',
  components: { PageContent },
  setup() {
    return { tableConfig }
  }
})
</script>

<style lang="less" scoped>
.goods {
  padding: 20px 0;
  .content {
    margin: 20px 0;
    padding: 20px;
    border-top: 20px solid #f5f5f5;
  }
}
</style>
