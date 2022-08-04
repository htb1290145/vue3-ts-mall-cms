import { htbRequest } from '../index'
import type { IAccount, IDataType, ILoginResult } from './type'

// 枚举
enum LoginAPI {
  AccountLogin = './login',
  LoginUserInfo = './users/',
  UserMenu = './role/'
}

export function accountLoginRequest(account: IAccount) {
  return htbRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function loginUserInfoByIdRequest(id: number) {
  return htbRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id
  })
}

export function userMenuByRoleIdRequest(id: number) {
  return htbRequest.get<IDataType>({
    url: LoginAPI.UserMenu + id + '/menu'
  })
}
