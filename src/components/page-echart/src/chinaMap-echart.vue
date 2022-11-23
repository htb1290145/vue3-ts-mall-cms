<template>
  <div class="chinaMap-echart">
    <base-echart
      :echart-div-style="{ width: '100%', height: '360px' }"
      :options="chinaMapOptions"
    ></base-echart>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import BaseEchart from '@/base-ui/echart'
import { IDataType } from './type/index'

// 地图转化数据函数
import { convertData } from '../utils/covert-data'

export default defineComponent({
  components: { BaseEchart },
  props: {
    chinaMapData: {
      type: Array as PropType<IDataType[]>
    }
  },
  setup(props) {
    const chinaMapOptions = computed(() => {
      return {
        backgroundColor: '#fff',
        title: {
          text: '全国销量统计',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params: any) {
            return params.name + ' : ' + params.value[2]
          }
        },
        visualMap: {
          min: 0,
          max: 60000,
          left: 20,
          bottom: 20,
          calculable: true,
          text: ['高', '低'],
          inRange: {
            color: [
              'rgb(70, 240, 252)',
              'rgb(250, 220, 46)',
              'rgb(245, 38, 186)'
            ]
          },
          textStyle: {
            color: '#fff'
          }
        },
        geo: {
          map: 'china',
          roam: 'scale',
          emphasis: {
            areaColor: '#f4cccc',
            borderColor: 'rgb(9, 54, 95)',
            itemStyle: {
              areaColor: '#f4cccc'
            }
          }
        },
        series: [
          {
            name: '销量',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(props.chinaMapData),
            symbolSize: 12,
            emphasis: {
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
              }
            }
          },
          {
            type: 'map',
            map: 'china',
            geoIndex: 0,
            aspectScale: 0.75,
            tooltip: {
              show: false
            }
          }
        ]
      }
    })
    return { chinaMapOptions }
  }
})
</script>

<style scoped></style>
