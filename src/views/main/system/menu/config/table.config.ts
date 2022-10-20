export const tableConfig = {
  title: '商品列表',
  // 表格字段
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '150' },
    { prop: 'type', label: '级别', minWidth: '80' },
    { prop: 'url', label: '菜单url', minWidth: '80' },
    { prop: 'icon', label: '菜单icon', minWidth: '80' },
    { prop: 'sort', label: '排序', minWidth: '80' },
    { prop: 'permission', label: '按钮权限', minWidth: '120' },

    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '180',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '180',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minWidth: '180',
      slotName: 'handle'
    }
  ],
  showSelectionColumn: false,
  showIndexColumn: false,
  showFooter: false,
  // 自定义el-table的属性
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    },
    defaultSort: { prop: 'sort', order: 'ascending' },
    // 默认展开航，row-key
    expandRowKeys: ['38']
  }
}
