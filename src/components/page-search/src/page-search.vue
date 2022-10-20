<template>
  <!-- 搜索区域 -->
  <div class="page-search">
    <!-- v-bind绑定多个属性 -->
    <!-- 1.向form子组件传递formDate，会导致在form中修改props -->
    <!-- <htb-form v-bind="searchFormConfig" :formData="formData"></htb-form> -->
    <!-- 2.v-model双向绑定后，在form中的props为modelValue -->
    <HtbForm v-bind="searchFormConfig" v-model="formData">
      <!-- 头部 -->
      <template #header>
        <h1>高级检索</h1>
      </template>
      <!-- 底部 -->
      <template #footer>
        <div class="footer">
          <el-button @click="handleResetClick">
            <el-icon class="el-icon"><Refresh /></el-icon>
            重置
          </el-button>
          <el-button type="primary" @click="handleSearchClick">
            <el-icon class="el-icon"><Search /></el-icon>
            搜索
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
  emits: ['resetBtnClick', 'searchBtnClick'],
  setup(props, { emit }) {
    // 1-表单数据：双向绑定的属性应该由配置文件的field来决定
    const formItems = props.searchFormConfig.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      // 给数据对象添加filed对应的属性
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    // 2-搜索表单：得到搜索表单的数据——发送至user.vue——发送到pageContent重新发送网络请求获取table数据
    const handleSearchClick = () => {
      emit('searchBtnClick', formData.value)
    }
    // 3-重置表单：重置数据
    const handleResetClick = () => {
      // （1-form.vue直接:model-value的方式
      // formData.value = formOriginData
      // （2-v-model方式，浅拷贝的重置方式
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key]
      }
      emit('resetBtnClick')
    }
    return {
      formData,
      handleResetClick,
      handleSearchClick
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
