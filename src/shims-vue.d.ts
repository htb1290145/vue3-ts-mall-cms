/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare type LoadingOptionsResolved1 = {
  lock?: boolean
  text?: string
  background?: string
}
