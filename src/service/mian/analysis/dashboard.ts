import { htbRequest } from '@/service'

export function getDashboardData(url: string) {
  return htbRequest.get({ url: url })
}
