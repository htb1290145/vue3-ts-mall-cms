<template>
  <div class="line-echart">
    <base-echart
      :echart-div-style="{ width: '100%', height: '360px' }"
      :options="Lineoption"
    ></base-echart>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseEchart from '@/base-ui/echart'

export default defineComponent({
  components: { BaseEchart },
  props: {
    xLabels: { type: Array },
    values: { type: Array }
  },
  setup(props) {
    const Lineoption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {},
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: props.xLabels
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '分别销量',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: props.values
        }
      ]
    }

    return { Lineoption }
  }
})
</script>

<style scoped></style>
