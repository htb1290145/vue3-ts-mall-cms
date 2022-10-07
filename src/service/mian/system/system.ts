import { htbRequest } from '../../index'

export function getAllUserList(url: string, queryInfo: any) {
  return htbRequest.post({
    url: url,
    data: queryInfo
  })
}
