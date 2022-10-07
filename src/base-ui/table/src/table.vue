<template>
  <div class="htb-table">
    <!-- 表格标题 -->
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handle">
          <slot name="headerHandle">处理部分</slot>
        </div>
      </slot>
    </div>

    <!-- 表格部分 -->
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!-- 选择列 -->
      <el-table-column
        v-if="showSelectionColumn"
        type="selection"
        align="center"
        width="80"
      ></el-table-column>
      <!-- 序号列 -->
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        align="center"
        width="80"
      ></el-table-column>
      <!-- 数据区域 -->
      <template v-for="item in propList" :key="item.prop">
        <el-table-column v-bind="item" align="center">
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">{{
              scope.row[item.prop]
            }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <!-- 表格底部部分 -->
    <div class="footer">
      TODO:
      <slot name="footer">表格底部</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    // 表格标题
    title: {
      type: String,
      default: '表格标题'
    },
    // 是否显示选择列
    showSelectionColumn: {
      type: Boolean,
      default: false
    },
    // 是否显示序号列
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    // 表格数据
    tableData: {
      type: Array,
      required: true
    },
    // 表格字段
    propList: {
      type: Array,
      required: true
    }
  },
  emits: ['selectionChange'],
  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value)
    }
    return { handleSelectionChange }
  }
})
</script>

<style lang="less" scoped>
.title {
  font-size: 20px;
  font-weight: 700;
}
.el-table {
  margin-top: 20px;
}
</style>
