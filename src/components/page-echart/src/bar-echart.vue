<template>
  <div class="bar-echart">
    <base-echart
      :echart-div-style="{ width: '100%', height: '360px' }"
      :options="Baroption"
    ></base-echart>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import * as echarts from 'echarts'
import BaseEchart from '@/base-ui/echart'

export default defineComponent({
  components: { BaseEchart },
  props: {
    barData: { type: Array, required: false },
    xLabels: { type: Array },
    values: { type: Array }
  },
  setup(props) {
    const Baroption = {
      /*       title: {
        text: '分类商品的销量'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['上衣', '裤子', '鞋子', '厨具', '家具', '床上用品', '女装']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: props.barData
        }
      ] */
      xAxis: {
        data: props.xLabels,
        axisLabel: {
          inside: true,
          color: '#fff'
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        z: 10
      },
      yAxis: {
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#999'
        }
      },
      dataZoom: [
        {
          type: 'inside'
        }
      ],
      series: [
        {
          type: 'bar',
          showBackground: true,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }
            ])
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' }
              ])
            }
          },
          data: props.values
        }
      ]
    }

    return { Baroption }
  }
})
</script>

<style scoped></style>
