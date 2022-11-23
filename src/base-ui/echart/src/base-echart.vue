<template>
  <div ref="echartDivRef" class="base-echart" :style="echartDivStyle"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watchEffect } from 'vue'
import { useEchart } from '../hooks/use-echart'
import emitter from '@/utils/mitt'

export default defineComponent({
  props: {
    echartDivStyle: {
      type: Object,
      default: () => ({ width: '100%', height: '360px' })
    },
    options: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const echartDivRef = ref<HTMLElement>()
    // setup时，Html模板没有处理完，ref为空
    onMounted(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { setOptions, setResize } = useEchart(echartDivRef.value!)
      watchEffect(() => {
        setOptions(props.options)
      })

      // 菜单折叠，echart重绘：事件总线
      emitter.on('isResize', () => {
        setResize()
      })
    })

    return { echartDivRef }
  }
})
</script>

<style scoped></style>
