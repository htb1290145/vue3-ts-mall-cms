import { ref } from 'vue'
import PageDialog from '@/components/page-dialog'

type CallBackFn = () => void

export function usePageDialog(
  newCallBack: CallBackFn,
  editCallBack: CallBackFn
) {
  //dailog相关
  const pageDialogRef = ref<InstanceType<typeof PageDialog>>()
  // dailog中表单的数据 = table行中的数据
  const defaultInfo = ref({})

  // 新建按钮
  const handleNewClick = () => {
    defaultInfo.value = {}
    if (pageDialogRef.value) {
      pageDialogRef.value.dialogVisible = true
    }
    newCallBack && newCallBack()
  }
  // table中编辑按钮
  const handleEditClick = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageDialogRef.value) {
      pageDialogRef.value.dialogVisible = true
    }
    editCallBack && editCallBack()
  }
  return [pageDialogRef, defaultInfo, handleNewClick, handleEditClick]
}
