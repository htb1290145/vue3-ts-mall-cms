<template>
  <div class="htb-form">
    <!-- 插槽：某些表单才有的独特功能 -->
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth" ref="formRef">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <!-- v-bind绑定多个属性 -->
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <!-- 文本框和密码 -->
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.field}`]"
                />
              </template>
              <!-- 多选框 -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.label }}</el-option
                  >
                </el-select>
              </template>
              <!-- 日期选择器 -->
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- 插槽：某些表单才有的独特功能 -->
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { IFormItem } from '../type'
// import type { FormInstance } from 'element-plus'
import { ElForm } from 'element-plus'

export default defineComponent({
  props: {
    // v-model数据
    modelValue: {
      type: Object,
      required: true,
      default: () => ({})
    },
    // 表单项配置文件
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    // 样式
    itemStyle: {
      type: Object,
      default: () => ({ padding: '5px 30px' })
    },
    // 响应式占据的宽度
    colLayout: {
      type: Object,
      default: () => ({
        xs: 24,
        sm: 24,
        md: 12,
        lg: 8,
        xl: 6
      })
    }
  },
  emit: ['update:modelValue'],
  setup(props, { emit }) {
    // 组件v-model的写法
    const formData = ref({ ...props.modelValue })
    // 监听数据改变，emit发射。对象的属性改变，要深度监听
    watch(
      formData,
      (newValue) => {
        emit('update:modelValue', newValue)
      },
      {
        deep: true
      }
    )
    // const formRef = ref<FormInstance>()
    const formRef = ref<InstanceType<typeof ElForm>>()
    // const resetForm = () => {
    //   formRef.value.resetFields()
    //   console.log('resetForm')
    // }
    const resetForm = () => {
      formRef.value?.resetFields()
    }
    return {
      formData,
      formRef,
      resetForm
    }
  }
})
</script>

<style lang="less" scoped></style>
