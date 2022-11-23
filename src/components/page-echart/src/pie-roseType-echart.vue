<template>
  <div class="pie-echart">
    <base-echart
      :echart-div-style="{ width: '100%', height: '360px' }"
      :options="pieOptions"
    ></base-echart>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import BaseEchart from '@/base-ui/echart'
import { IDataType } from './type/index'

export default defineComponent({
  components: { BaseEchart },
  props: {
    pieRoseData: {
      type: Array as PropType<IDataType[]>,
      required: true
    }
  },
  setup(props) {
    const pieOptions = computed(() => {
      return {
        legend: {
          top: 'bottom'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '类别数据 ',
            type: 'pie',
            radius: [25, 100],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: props.pieRoseData
            // [
            //   { value: 40, name: 'rose 1' },
            //   { value: 38, name: 'rose 2' },
            //   { value: 32, name: 'rose 3' },
            //   { value: 30, name: 'rose 4' },
            //   { value: 28, name: 'rose 5' },
            //   { value: 26, name: 'rose 6' },
            //   { value: 22, name: 'rose 7' },
            //   { value: 18, name: 'rose 8' }
            // ]
          }
        ]
      }
    })
    return { pieOptions }
  }
})
</script>

<style scoped></style>
