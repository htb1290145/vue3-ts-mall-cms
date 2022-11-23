// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts'
// 中国地图数据
import chinaMapJson from '../data/china.json'
// 中国地图注册
echarts.registerMap('china', chinaMapJson)

export function useEchart(el: HTMLElement) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const echartInstance = echarts.init(el)
  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }
  // 页面变化，echart重绘
  const setResize = () => {
    echartInstance.resize()
  }
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  return {
    echartInstance,
    setOptions,
    setResize
  }
}
