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
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'intro',
      type: 'input',
      label: '角色权限',
      placeholder: '请输入角色权限'
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
