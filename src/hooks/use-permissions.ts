import { useStore } from 'vuex'

export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const permissions = store.state.login.permissions
  const verifyPermission = `system:${pageName}:${handleName}`

  return Boolean(permissions.find((item: any) => item === verifyPermission))
  // 两次取反变成布尔值
  // return !!permissions.find((item: any) => item === verifyPermission)
}
