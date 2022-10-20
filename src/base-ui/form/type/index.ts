type IFormType = 'input' | 'password' | 'select' | 'datepicker'

// 表单项类型
export interface IFormItem {
  type: IFormType
  // v-model的field 字段
  field: string
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对特殊属性
  otherOptions?: any
  isHidden?: boolean
}

// 表单类型：包括样式等
export interface IForm {
  // 表单项配置文件
  formItems: IFormItem[]
  labelWidth?: string
  // 响应式占据的宽度
  colLayout?: any
  // 样式
  itemStyle?: any
}
