export const tableConfig = {
  title: '商品列表',
  // 表格字段
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '80' },
    { prop: 'oldPrice', label: '原价格', minWidth: '80', slotName: 'oldPrice' },
    { prop: 'newPrice', label: '新价格', minWidth: '80' },
    { prop: 'imgUrl', label: '商品图片', minWidth: '80', slotName: 'image' },
    { prop: 'desc', label: '商品描述', minWidth: '80' },
    { prop: 'status', label: '状态', minWidth: '80' },
    { prop: 'saleCount', label: '销量', minWidth: '80' },
    { prop: 'inventoryCount', label: '库存', minWidth: '80' },
    { prop: 'favorCount', label: '收藏', minWidth: '80' },
    { prop: 'address', label: '地址', minWidth: '80' },
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
    }
  ],
  showSelectionColumn: true,
  showIndexColumn: true
}
