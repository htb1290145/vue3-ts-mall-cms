<template>
  <div class="htb-table">
    <!-- header -->
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handle">
          <slot name="headerHandle">处理部分</slot>
        </div>
      </slot>
    </div>

    <!-- 表格 -->
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
        label="序号"
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

    <!-- footer -->
    <div class="footer">
      <slot name="footer">
        <el-pagination
          v-model:page-size="pageSize"
          v-model:currentPage="currentPage"
          :page-sizes="[5, 10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

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
      type: Array
    },
    // 分页器总计
    total: {
      type: Number,
      default: 0
    }
  },
  emits: ['selectionChange', 'handlePageSizeChange', 'handleCurrentChange'],
  setup(props, { emit }) {
    // 1.表格相关
    // 多选框变化事件
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value)
    }

    // 2.分页器相关
    const pageSize = ref()
    const currentPage = ref()

    watch(pageSize, (newValue: any) => {
      emit('handlePageSizeChange', newValue)
    })
    watch(currentPage, (newValue: any) => {
      emit('handleCurrentChange', newValue)
    })

    return {
      handleSelectionChange,
      currentPage,
      pageSize
    }
  }
})
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  .title {
    font-size: 20px;
    font-weight: 700;
  }
}
.el-table {
  margin: 20px 0;
}
.el-pagination {
  justify-content: flex-end;
}
</style>
