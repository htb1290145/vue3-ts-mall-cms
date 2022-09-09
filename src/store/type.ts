import { loginState } from './login/login'

export interface IRootState {
  account: string
  // password: string
}

export interface IRootWithModule {
  login: loginState
}

export type IStoreType = IRootState & IRootWithModule
