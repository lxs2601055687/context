<template>
  <div class="chart" ref="chart"></div>
</template>

<script>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, BarChart } from 'echarts/charts'
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
  GridComponent
])
export default {
  name: 'classificationAreaHaiNan',
  data(){
    return {
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
        const option = { tooltip: {
            trigger: 'item',
            axisPointer: {
              // Use axis to trigger tooltip
              type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            }
          },
          legend: {},
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '15%',
            containLabel: true
          },
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: ['耕地', '种植园用地', '林地', '草地', '湿地', '城镇/工矿', '交通运输', '水域/水利']
          },
          series: [
            {
              name: '水田',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [309453.64]
            },
            {
              name: '水浇地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [3857.18]
            },
            {
              name: '旱地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [173601.91]
            },
            {
              name: '果园',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 158588.58]
            },
            {
              name: '茶园',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 1982.58]
            },
            {
              name: '橡胶园',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 723982.38]
            },
            {
              name: '其他园地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 333152.29]
            },
            {
              name: '乔木',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 1016485.7]
            },
            {
              name: '竹林',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 7388.14]
            },
            {
              name: '灌木',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 94287.99]
            },
            {
              name: '其它林地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 55986.31]
            },
            {
              name: '天然牧草地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 358.27]
            },
            {
              name: '人工牧草地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 953.55]
            },
            {
              name: '其他草地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 15789.51]
            },
            {
              name: '红树林地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 0, 5686.14]
            },
            {
              name: '森林沼泽',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 0, 2.47]
            },
            {
              name: '灌丛沼泽',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 0, 118.45]
            },
            {
              name: '沼泽草地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 0, 72.5]
            },
            {
              name: '沿海滩涂',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 0, 105820.09]
            },
            {
              name: '内陆滩涂',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 0, 9474.69]
            },
            {
              name: ' 沼泽地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 0, 3.96]
            },
            {
              name: ' 城市',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 0, 0, 35555.06]
            },
            {
              name: ' 建制镇',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 0, 0, 60425.69]
            },
            {
              name: ' 村庄',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 0, 0, 128155.82]
            },
            {
              name: ' 采矿用地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 0, 0, 8585.58]
            },
            {
              name: '风景名胜及特殊用地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 0, 0, 10371.08]
            },
            {
              name: '铁路用地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 0, 0, 0, 3054.18]
            },
            {
              name: '轨道交通用地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 0, 0, 0, 5.13]
            },
            {
              name: '公路用地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 0, 0, 0, 22157.41]
            },
            {
              name: '农村道路',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 0, 0, 0, 30116.56]
            },
            {
              name: '机场用地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 0, 0, 0, 2209.32]
            },
            {
              name: '港口码头用地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 0, 0, 0, 1365.09]
            },
            {
              name: '管道运输用地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 0, 0, 0, 41.65]
            },
            {
              name: '河流水面',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 0, 0, 0, 0, 42000.21]
            },
            {
              name: '湖泊水面',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 0, 0, 0, 0, 481.24]
            },
            {
              name: '水库水面',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 0, 0, 0, 0, 54428.82]
            },
            {
              name: '坑塘水面',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 0, 0, 0, 0, 71088.01]
            },
            {
              name: '沟渠',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 0, 0, 0, 0, 11772.17]
            },
            {
              name: '水工建筑用地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [0, 0, 0, 0, 0, 0, 0, 3340.76]
            }

          ]}
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
}

</script>

<style scoped>
.chart {
  height: 90vh;
 width: 190vh;
}
</style>
