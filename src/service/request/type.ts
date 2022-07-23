import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 拦截器接口
export interface HTBRequestInterceptors<T = AxiosResponse> {
  // 请求拦截
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  // 响应拦截
  // responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

// config接口
// HTBRequestConfig 继承自 AxiosRequestConfig——扩展了自己的拦截器
export interface HTBRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: HTBRequestInterceptors<T>
  showLoading?: boolean
}
