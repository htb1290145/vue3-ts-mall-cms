type IFormType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对特殊属性
  otherOptions?: any
}

export interface IForm {
  // 表单项配置文件
  formItems: IFormItem[]
  labelWidth?: string
  // 响应式占据的宽度
  colLayout?: any
  // 样式
  itemStyle?: any
}
