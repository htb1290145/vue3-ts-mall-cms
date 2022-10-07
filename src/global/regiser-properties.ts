import { App } from 'vue'
import { formatUtcString } from '@/utils/date-formate'
export default function regiserProperties(app: App) {
  app.config.globalProperties.$filters = {
    foo() {
      console.log('foo')
    },
    formatTime(value: string) {
      return formatUtcString(value)
    }
  }
}
