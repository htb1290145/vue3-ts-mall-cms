import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全局注册
import { globalRegister } from './global'
// 重置样式css
import 'normalize.css'
import './assets/css/index.css'
// el-icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 全局引用
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// .use(ElementPlus)

// ele的国际化 全局
// import ElementPlus from 'element-plus'
// import zhCn from 'element-plus/es/locale/lang/zh-cn'
// app.use(ElementPlus, {
//   locale: zhCn
// })

const app = createApp(App)
//global全局一次性注册
globalRegister(app)
// app.use(globalRegister)

// el-icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 网络请求
// import { htbRequest } from './service/index'

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// 实例1的某个请求
// htbRequest
//   .request<DataType>({
//     url: '/home/multidata',
//     method: 'GET',
//     // 实例1的单独某个请求的单独拦截器
//     interceptors: {
//       requestInterceptor: (config) => {
//         // console.log('实例1的单独某个请求的请求成功拦截')
//         return config
//       },
//       responseInterceptor: (config) => {
//         // console.log('实例1的单独某个请求的响应成功拦截')
//         return config
//       }
//     }
//     // showLoading: false
//   })
//   .then(
//     (res) => {
//       console.log(res.data)
//     },
//     (err) => {
//       console.log(err)
//     }
//   )
// htbRequest
//   .get<DataType>({
//     url: '/home/multidata',
//     // 实例1的单独某个请求的单独拦截器
//     interceptors: {
//       requestInterceptor: (config) => {
//         // console.log('实例1的get请求的请求成功拦截')
//         return config
//       },
//       responseInterceptor: (config) => {
//         // console.log('实例1的get请求的响应成功拦截')
//         return config
//       }
//     },
//     showLoading: false
//   })
//   .then(
//     (res) => {
//       console.log(res)
//     },
//     (err) => {
//       console.log(err)
//     }
//   )

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

// 防止Vuex的数据刷新后丢失，从缓存中获取
import { setupStore } from './store'
app.use(store)
setupStore()

app.use(router)
app.mount('#app')
