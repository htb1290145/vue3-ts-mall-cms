export const tableConfig = {
  title: '用户列表',
  // 表格字段
  propList: [
    { prop: 'name', label: '用户名', minWidth: '40' },
    { prop: 'realname', label: '真实姓名', minWidth: '40' },
    { prop: 'cellphone', label: '电话号码', minWidth: '60' },
    { prop: 'enable', label: '状态', minWidth: '40', slotName: 'enable' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '60',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '60',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '60', slotName: 'handle' }
  ],
  showSelectionColumn: true,
  showIndexColumn: true
}
