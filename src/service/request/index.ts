import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HTBRequestInterceptors, HTBRequestConfig } from './type'
import { ElLoading } from 'element-plus'

const DEFAULT_LOADING = true

class HTBRequest {
  instance: AxiosInstance
  interceptors?: HTBRequestInterceptors
  showLoading: boolean
  loading?: any

  constructor(config: HTBRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 保存基本信息。拦截器、显示loading
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    // 1.constructor每次new时都会执行，config中取出的拦截器是实例拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2.添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有的请求都有的请求拦截器')
        if (this.showLoading) {
          // ElLoading
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有的请求都有的响应拦截器')
        // 关闭loading
        this.loading?.close()
        return res.data
      },
      (err) => {
        return err
      }
    )
  }

  request<T = any>(config: HTBRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 3.某个实例某个请求的拦截器。从config取出的。
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 某个请求不想有loading时
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      // 请求的数据处理
      this.instance.request<any, T>(config).then(
        (res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 设置回初始值，不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          // 请求成功,把结果resolve返回出去
          resolve(res)
        },
        (err) => {
          // 设置回初始值，不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          // 请求失败的操作
          reject(err)
          return err
        }
      )
    })
  }

  get<T = any>(config: HTBRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: HTBRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: HTBRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: HTBRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HTBRequest
