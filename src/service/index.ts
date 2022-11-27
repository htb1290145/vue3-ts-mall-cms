// 统一出口
import HTBRequest from './request'
// 导入config
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

export const htbRequest = new HTBRequest({
  // config
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 单个实例共有的拦截器
  interceptors: {
    requestInterceptor: (config) => {
      // 给每个请求携带登录token
      const token = localCache.getCache('token')
      if (token) {
        // Bearer 项目的特殊字符串
        config.headers.Authorization = `Bearer ${token}`
      } else {
        // 如果没有token，页面跳转至登录页面
      }
      // console.log('同个实例都有的请求成功拦截')
      return config
    },
    requestInterceptorCatch: (err) => {
      // console.log('同个实例都有的请求失败拦截')
      return err
    },
    responseInterceptor: (config) => {
      // console.log('同个实例都有的响应成功拦截')
      return config
    },
    responseInterceptorCatch: (err) => {
      // console.log('同个实例都有的响应失败拦截')
      return err
    }
  },
  showLoading: true
})
