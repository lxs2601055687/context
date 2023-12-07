<template>
<!--  <v-chart class="chart" :option="option" autoresize />-->
  <div class="chart" ref="chart"></div>
</template>

<script>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'


use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
])

export default {
  name: 'landStatus',
  data() {
    return {};
  },
  mounted() {
    this.getEchartData()
  },
  methods: {
    getEchartData() {
      const chart = this.$refs.chart
      if (chart) {
        const myChart = this.$echarts.init(chart)
        const option = { title: {
            text: '土地状况饼图',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耕地', '园地', '林地', '草地', '城镇村及工矿用地', '交通运输用地', '水域及水利设施用地', '其他土地']
          },
          series: [
            {
              name: '土地状况、 单位：万公顷',
              type: 'pie',
              radius: '70%',
              center: ['60%', '60%'],
              data: [
                { value: 12.1, name: '耕地' },
                { value: 48.7, name: '园地' },
                { value: 121.7, name: '林地' },
                { value: 117.0, name: '草地' },
                { value: 1.7, name: '城镇村及工矿用地' },
                { value: 24.6, name: '交通运输用地' },
                { value: 6.0, name: '水域及水利设施用地' },
                { value: 18.3, name: '其他土地' }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ] }
        myChart.setOption(option)
        window.addEventListener("resize", function() {
          myChart.resize()
        })
      }
      this.$on('hook:destroyed',()=>{
        window.removeEventListener("resize", function() {
          myChart.resize()
        });
      })
    },
  }
};
</script>

<style scoped>
.chart {
  height: 100vh;
}
</style>