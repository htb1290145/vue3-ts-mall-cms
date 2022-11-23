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

export function createPageListData(url: string, newData: any) {
  return htbRequest.post({
    url: url,
    data: newData
  })
}

export function editPageListData(url: string, editData: any) {
  return htbRequest.patch({
    url: url,
    data: editData
  })
}
