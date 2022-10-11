export const tableConfig = {
  title: '角色列表',
  // 表格字段
  propList: [
    { prop: 'name', label: '角色名', minWidth: '40' },
    { prop: 'intro', label: '权限介绍', minWidth: '40' },
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
