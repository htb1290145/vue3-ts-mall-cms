import { loginState } from './login/login'
import { systemState } from './main/system/system'
import { IDashboardState } from './main/analysis/dashboard'

export interface IRootState {
  account: string
  // password: string,
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

// 模块的接口
export interface IRootWithModule {
  login: loginState
  system: systemState
  dashboard: IDashboardState
}

export type IStoreType = IRootState & IRootWithModule
