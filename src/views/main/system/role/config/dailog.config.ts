import { IForm } from '@/base-ui/form'

export const dialogConfig: IForm = {
  // 表单配置文件
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'intro',
      type: 'input',
      label: '角色介绍',
      placeholder: '请输入角色介绍'
    }
  ],
  // 响应式占据的宽度
  colLayout: {
    span: 24
  },
  // 样式
  itemStyle: {}
}
