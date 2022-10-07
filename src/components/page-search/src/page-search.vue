<template>
  <!-- 搜索区域 -->
  <div class="page-search">
    <!-- v-bind绑定多个属性 -->
    <!-- 1.向form子组件传递formDate，会导致在form中修改props -->
    <!-- <htb-form v-bind="searchFormConfig" :formData="formData"></htb-form> -->
    <!-- 2.v-model双向绑定后，在form中的props为modelValue -->
    <HtbForm v-bind="searchFormConfig" v-model="formData" ref="userFormRef">
      <template #header>
        <h1>高级检索</h1>
      </template>
      <template #footer>
        <div class="footer">
          <el-button>
            <el-icon class="el-icon"><Search /></el-icon>
            搜索
          </el-button>
          <el-button type="primary" @click="resetHtbForm">
            <el-icon class="el-icon"><Refresh /></el-icon>
            重置
          </el-button>
        </div>
      </template>
    </HtbForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HtbForm from '@/base-ui/form'

export default defineComponent({
  components: {
    HtbForm
  },
  props: {
    searchFormConfig: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  setup() {
    // 表单数据
    const formData = ref({
      id: '',
      username: '',
      password: '',
      sport: '',
      createTime: ''
    })
    // 重置表单
    const userFormRef = ref()
    const resetHtbForm = () => {
      // userFormRef.value.resetForm()
      console.log(1)
    }
    return {
      formData,
      userFormRef,
      resetHtbForm
    }
  }
})
</script>

<style scoped>
.footer {
  text-align: right;
  margin-right: 40px;
}
.el-icon {
  margin-right: 5px;
}
</style>
