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
    pieData: {
      type: Array as PropType<IDataType[]>,
      required: true
    }
  },
  setup(props) {
    const pieOptions = computed(() => {
      return {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          left: 'left'
        },
        series: [
          {
            name: '分类数据',
            type: 'pie',
            radius: '50%',
            data: props.pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    })
    return { pieOptions }
  }
})
</script>

<style scoped></style>
