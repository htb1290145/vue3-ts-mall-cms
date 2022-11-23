<template>
  <div class="htb-form">
    <!-- 插槽：某些表单才有的独特功能 -->
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <!-- v-bind绑定多个属性 -->
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <!-- 文本框和密码 -->
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <!-- (1.:model-value的方式 -->
                <!-- <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[item.field]"
                  @update:modelValue="handleValueChange($event, item.field)"
                /> -->
                <!-- (2.v-model的方式 -->
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                />
              </template>
              <!-- 多选框 -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.label"
                    >{{ option.label }}
                  </el-option>
                </el-select>
              </template>
              <!-- 日期选择器 -->
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                </el-date-picker>
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
import { defineComponent, PropType, ref } from 'vue'
import { IFormItem } from '../type'

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
    // (1-直接:model-value的方式
    // const handleValueChange = (value: any, field: string) => {
    //   emit('update:modelValue', { ...props.modelValue, [field]: value })
    // }

    // (2-组件v-model的写法：将传递进来的formData拷贝一份作为表单的数据
    const formData = ref({ ...props.modelValue })
    // 监听数据改变，emit发射。对象的属性改变，要深度监听
    // watch(
    //   formData,
    //   (newValue) => {
    //     emit('update:modelValue', newValue)
    //   },
    //   {
    //     deep: true
    //   }
    // )

    // // 2-重置表单：重置v-model数据
    // watch(
    //   () => props.modelValue,
    //   (newValue) => {
    //     formData.value = { ...newValue }
    //   }
    // )
    const handleValueChange = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }
    return {
      formData,
      handleValueChange
    }
  }
})
</script>

<style lang="less" scoped></style>
