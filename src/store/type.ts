import { loginState } from './login/login'
import { systemState } from './main/system/system'

export interface IRootState {
  account: string
  // password: string,
  entireDepartment: any[]
  entireRole: any[]
}

// 模块的接口
export interface IRootWithModule {
  login: loginState
  system: systemState
}

export type IStoreType = IRootState & IRootWithModule
