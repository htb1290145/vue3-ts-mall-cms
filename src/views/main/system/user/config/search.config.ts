import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  // 表单配置文件
  formItems: [
    {
      // field 字段
      field: 'id',
      type: 'input',
      label: 'id',
      placeholder: '请输入id'
    },
    {
      field: 'username',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'password',
      type: 'password',
      label: '密码',
      placeholder: '请输入密码'
    },
    {
      field: 'sport',
      type: 'select',
      label: '喜欢的运动',
      placeholder: '请选择喜欢的运动',
      // 多选框选项
      options: [
        { label: '篮球', value: '篮球' },
        { label: '足球', value: '足球' }
      ]
    },
    {
      field: 'createTime',
      type: 'datepicker',
      label: '创建时间',
      // 特殊属性
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束事件',
        type: 'daterange'
      }
    }
  ],
  labelWidth: '100px',
  // 响应式占据的宽度
  colLayout: {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 8,
    xl: 6
  },
  // 样式
  itemStyle: {
    padding: '5px 30px'
  }
}
