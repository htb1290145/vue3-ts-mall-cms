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
      v-bind="childrenProps"
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
        <el-table-column v-bind="item" align="center" show-overflow-tooltip>
          <!-- 自定义插槽：由传入的propList.slotName决定 -->
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">{{
              scope.row[item.prop]
            }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <!-- footer -->
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          v-model:page-size="page.pageSize"
          v-model:currentPage="page.currentPage"
          :page-sizes="[5, 10, 20]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataTotal"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'

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
    // 某些页面table特有的属性
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    // 分页器总计
    dataTotal: {
      type: Number,
      default: 0
    },
    // 分页器的数据，从pageContent通过v-model传递
    page: {
      type: Object,
      default: () => ({ currentPage: 1, pageSize: 10 })
    },
    //是否显示footer
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectionChange', 'update:pageSize', 'update:currentPage'],
  setup(props, { emit }) {
    // 1.表格相关
    // 多选框变化事件
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value)
    }

    // 2.分页器相关
    watch(
      () => props.page.pageSize,
      // (pageSize: number) => {
      //   console.log('update:pageSize')
      //   emit('update:pageSize', { ...props.page, pageSize })
      // }
      (pageSize: number) => {
        emit('update:pageSize', pageSize)
      }
    )
    watch(
      () => props.page.currentPage,
      // (currentPage: number) => {
      //   console.log('update:currentPage')
      //   emit('update:currentPage', { ...props.page, currentPage })
      // }
      (currentPage: number) => {
        emit('update:currentPage', currentPage)
      }
    )

    return {
      handleSelectionChange
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
