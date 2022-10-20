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
        <el-button type="primary" @click="dialogVisible = false"
          >确 认</el-button
        >
      </template></el-dialog
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import HtbForm from '@/base-ui/form/index'

export default defineComponent({
  components: { HtbForm },
  props: {
    dailogConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const dialogVisible = ref(false)
    const dailogFormData = ref<any>({})

    // 点击编辑后，拿到scope.row数据，传递给defaultInfo。此数据改变时，赋值给dailogFormData将数据显示在表单上
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.dailogConfig.formItems) {
          dailogFormData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )
    return { dialogVisible, dailogFormData }
  }
})
</script>

<style scoped></style>
