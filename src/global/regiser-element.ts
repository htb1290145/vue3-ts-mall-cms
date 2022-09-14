// app的类型
import { App } from 'vue'
import 'element-plus/dist/index.css'
// 局部引用的全局注册element-plus
import {
  ElButton,
  ElTabs,
  ElTabPane,
  ElCalendar,
  ElIcon,
  ElInput,
  ElRow,
  ElCol,
  ElFormItem,
  ElForm,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElMenuItemGroup,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElSelect,
  ElOption,
  ElDatePicker
} from 'element-plus'
const components = [
  ElButton,
  ElTabs,
  ElTabPane,
  ElCalendar,
  ElIcon,
  ElInput,
  ElRow,
  ElCol,
  ElFormItem,
  ElForm,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElSelect,
  ElOption,
  ElDatePicker
]

export default function (app: App) {
  for (const cpn of components) {
    app.component(cpn.name, cpn)
  }
}
