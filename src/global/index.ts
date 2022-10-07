// app的类型
import { App } from 'vue'
import regiserElement from './regiser-element'
import regiserProperties from './regiser-properties'

export function globalRegister(app: App) {
  regiserElement(app)
  regiserProperties(app)
}
