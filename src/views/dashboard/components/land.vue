<template>
<!--  <v-chart class="chart" :option="option" autoresize />-->
  <div class="chart" ref="chart"></div>
</template>

<script>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, BarChart, LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  BarChart,
  GridComponent,
  LineChart
])
export default {
  name: 'land',
  data() {
    return {
    };
  },
  mounted() {
    this.getEchartData()
  },
  methods: {
    getEchartData() {
      const chart = this.$refs.chart
      if (chart) {
        const myChart = this.$echarts.init(chart)
        const option = {         tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['耕地', '水旱田', '水田', '旱地'],
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [
              '2000', '2005', '2010', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021',
            ],
          },
          yAxis: {
            type: 'value',
            min: 100000,
            max: 500000,
          },
          series: [
            {
              name: '耕地',
              type: 'line',
              stack: '1',
              data: [
                433181, 416178, 419123, 424886, 422835, 427335, 439200, 439032, 438000, 436152, 438960,
              ],
            },
            {
              name: '水旱田',
              type: 'line',
              stack: '2',
              data: [
                240653, 221556, 222904, 225967, 226625, 231851, 238768, 240083, 242538, 242575, 249375,
              ],
            },
            {
              name: '水田',
              type: 'line',
              stack: '3',
              data: [
                182541, 166725, 176897, 175966, 173519, 176326, 180069, 182533, 181672, 183611, 190410,
              ],
            },
            {
              name: '旱地',
              type: 'line',
              stack: '4',
              data: [
                192528, 194623, 196219, 198919, 196211, 195484, 200432, 198949, 195462, 193577, 189585,
              ],
            },
          ],}
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
  height: 90vh;
  width: 190vh;
}
</style>