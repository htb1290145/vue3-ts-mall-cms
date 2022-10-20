import { htbRequest } from '../../index'

export function getPageListData(url: string, queryInfo: any) {
  return htbRequest.post({
    url: url,
    data: queryInfo
  })
}

export function deletePageData(url: string) {
  return htbRequest.delete({
    url: url
  })
}
