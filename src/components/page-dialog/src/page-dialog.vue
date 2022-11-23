<template>
  <div class="page-dialog">
    <el-dialog
      v-model="dialogVisible"
      title="标题"
      width="30%"
      center
      destroy-on-close
    >
      <htb-form v-bind="dailogConfig" v-model="dailogFormData"></htb-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirmClick">
          确 认
        </el-button>
      </template>
      <slot></slot>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'

import HtbForm from '@/base-ui/form/index'

export default defineComponent({
  components: { HtbForm },
  props: {
    pageName: { type: String, required: true },
    dailogConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const dialogVisible = ref(false)
    const dailogFormData = ref<any>({})

    // 1.点击编辑后，拿到scope.row数据，传递给defaultInfo。此数据改变时，赋值给dailogFormData将数据显示在表单上
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.dailogConfig.formItems) {
          dailogFormData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    // 2.确定按钮 -> 发送网络请求 -> 新建用户/编辑用户
    const store = useStore()
    const handleConfirmClick = () => {
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...dailogFormData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // 新建
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...dailogFormData.value, ...props.otherInfo }
        })
      }
      dialogVisible.value = false
    }

    return { dialogVisible, dailogFormData, handleConfirmClick }
  }
})
</script>

<style scoped></style>
