// app的类型
import { App } from 'vue'
import regiserElement from './regiser-element'

export function globalRegister(app: App) {
  regiserElement(app)
}
