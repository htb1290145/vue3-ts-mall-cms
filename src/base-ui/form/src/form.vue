<template>
  <div>
    <el-form label-width="100px">
      <!-- 第一排 -->
      <el-row>
        <el-col :span="8" v-for="(item, index) in formItem" :key="index">
          <el-form-item :label="item.label">
            <el-input :placeholder="item.placeholder" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IFormItem } from '../type'

export default defineComponent({
  props: {
    formItem: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
