// app的类型
import { App } from 'vue'
// 局部引用的全局注册element-plus
import {
  ElButton,
  ElTabs,
  ElTabPane,
  ElCalendar,
  ElIcon,
  ElInput,
  ElRow,
  ElFormItem,
  ElForm,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain
} from 'element-plus'
import 'element-plus/dist/index.css'
const components = [
  ElButton,
  ElTabs,
  ElTabPane,
  ElCalendar,
  ElIcon,
  ElInput,
  ElRow,
  ElFormItem,
  ElForm,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain
]

export default function (app: App) {
  for (const cpn of components) {
    app.component(cpn.name, cpn)
  }
}
