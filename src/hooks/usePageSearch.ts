import { ref } from 'vue'
import PageContent from '@/components/page-content'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  // 重置按钮：发送初始页面时的网络请求
  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }
  // 搜索按钮：拼接queryInfo
  const handleSearchClick = (queryInfo: any) => {
    console.log('搜索')

    console.log(queryInfo)
    pageContentRef.value?.getPageData(queryInfo)
  }
  // 元组方式
  return [pageContentRef, handleResetClick, handleSearchClick]
}
