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
    return {
      option: {
        title: {
          text: '农业普查饼图',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['转包', '转让', '互换', '出租', '入股', '其他'],
        },
        series: [
          {
            name: '百分比数据',
            type: 'pie',
            radius: '60%',
            center: ['60%', '60%'],
            data: [
              { value: 67.5, name: '转包' },
              { value: 0.3, name: '转让' },
              { value: 0.1, name: '互换' },
              { value: 25.7, name: '出租' },
              { value: 0.8, name: '入股' },
              { value: 5.6, name: '其他' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      }
    }
  },
  mounted() {
    this.getEchartData()
  },
  methods: {
    getEchartData() {
      const chart = this.$refs.chart
      if (chart) {
        const myChart = this.$echarts.init(chart)
        const option = {  title: {
            text: '农业普查饼图',
            left: 'center',
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['转包', '转让', '互换', '出租', '入股', '其他'],
          },
          series: [
            {
              name: '百分比数据',
              type: 'pie',
              radius: '60%',
              center: ['60%', '60%'],
              data: [
                { value: 67.5, name: '转包' },
                { value: 0.3, name: '转让' },
                { value: 0.1, name: '互换' },
                { value: 25.7, name: '出租' },
                { value: 0.8, name: '入股' },
                { value: 5.6, name: '其他' },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
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
  height: 100vh;
}
</style>