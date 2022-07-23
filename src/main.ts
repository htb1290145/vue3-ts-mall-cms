import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { globalRegister } from './global'

// 全局引用
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// .use(ElementPlus)

const app = createApp(App)

//global全局一次性注册
globalRegister(app)
// app.use(globalRegister)

// 网络请求
import { htbRequest } from './service/index'

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

// 实例1的某个请求
htbRequest
  .request<DataType>({
    url: '/home/multidata',
    method: 'GET',
    // 实例1的单独某个请求的单独拦截器
    interceptors: {
      requestInterceptor: (config) => {
        console.log('实例1的单独某个请求的请求成功拦截')
        return config
      },
      responseInterceptor: (config) => {
        console.log('实例1的单独某个请求的响应成功拦截')
        return config
      }
    }
    // showLoading: false
  })
  .then(
    (res) => {
      console.log(res.data)
    },
    (err) => {
      console.log(err)
    }
  )
htbRequest
  .get<DataType>({
    url: '/home/multidata',
    // 实例1的单独某个请求的单独拦截器
    interceptors: {
      requestInterceptor: (config) => {
        console.log('实例1的get请求的请求成功拦截')
        return config
      },
      responseInterceptor: (config) => {
        console.log('实例1的get请求的响应成功拦截')
        return config
      }
    },
    showLoading: false
  })
  .then(
    (res) => {
      console.log(res)
    },
    (err) => {
      console.log(err)
    }
  )

// 实例2
// htbRequest2.request({
//   url: '/home/multidata',
//   method: 'GET',
//   // 实例2的单独某个请求的单独拦截器
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('实例2的单独某个请求的请求成功拦截')
//       return config
//     },
//     responseInterceptor: (config) => {
//       console.log('实例2的单独某个请求的响应成功拦截')
//       return config
//     }
//   }
// })
app.use(store).use(router).mount('#app')
