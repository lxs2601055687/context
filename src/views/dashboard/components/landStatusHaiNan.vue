<template>
  <div style="display: flex">
<!--    <v-chart class="chart" :option="option" autoresize />
    <v-chart class="chart" :option="option3" autoresize />
    <v-chart class="chart" :option="option2" autoresize />-->
    <div class="chart" ref="chart"></div>
    <div class="chart" ref="chart2"></div>
    <div class="chart" ref="chart3"></div>
  </div>
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
  name: 'landStatusHaiKou',

  data() {
    return{
      option: {
        title: {
          text: '西部地区'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        /* legend: {
           orient: 'vertical',
           left: 'left',
           data: ['耕地', '园地', '林地', '草地', '城镇村及工矿用地', '交通运输用地', '水域及水利设施用地', '其他土地']
           // '耕地', '园地', '林地', '草地', '城镇村及工矿用地', '交通运输用地', '水域及水利设施用地', '其他土地'
         }, */
        series: [
          {
            name: '百分比数据',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['60%', '60%'],
            data: [
              { value: 67.3, name: '转包' },
              { value: 0.4, name: '转让' },
              { value: 0, name: '互换' },
              { value: 29.4, name: '出租' },
              { value: 0.4, name: '入股' },
              { value: 2.6, name: '其他' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      option2:{
        title: {
          text: '中部地区'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        /* legend: {
          orient: 'vertical',
          left: 'left',
          data: ['耕地', '园地', '林地', '草地', '城镇村及工矿用地', '交通运输用地', '水域及水利设施用地', '其他土地']
          // '耕地', '园地', '林地', '草地', '城镇村及工矿用地', '交通运输用地', '水域及水利设施用地', '其他土地'
        }, */
        series: [
          {
            name: '百分比数据',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['60%', '60%'],
            data: [
              { value: 69.4, name: '转包' },
              { value: 0.3, name: '转让' },
              { value: 0, name: '互换' },
              { value: 18.5, name: '出租' },
              { value: 0.5, name: '入股' },
              { value: 11.3, name: '其他' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]},
      option3:{
        title: {
          text: '西部地区'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        /* legend: {
           orient: 'vertical',
           left: 'left',
           data: ['耕地', '园地', '林地', '草地', '城镇村及工矿用地', '交通运输用地', '水域及水利设施用地', '其他土地']
           // '耕地', '园地', '林地', '草地', '城镇村及工矿用地', '交通运输用地', '水域及水利设施用地', '其他土地'
         }, */
        series: [
          {
            name: '百分比数据',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            center: ['60%', '60%'],
            data: [
              { value: 58.4, name: '转包' },
              { value: 0.2, name: '转让' },
              { value: 0.8, name: '互换' },
              { value: 33.2, name: '出租' },
              { value: 5.7, name: '入股' },
              { value: 1.6, name: '其他' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          }
        ]}
    }
  },
  mounted() {
    this.getEchartData()
    this.getEchartData2()
    this.getEchartData3()
  },
  methods: {
    getEchartData() {
      const chart = this.$refs.chart
      if (chart) {
        const myChart = this.$echarts.init(chart)
        const option = {  title: {
            text: '西部地区'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          /* legend: {
             orient: 'vertical',
             left: 'left',
             data: ['耕地', '园地', '林地', '草地', '城镇村及工矿用地', '交通运输用地', '水域及水利设施用地', '其他土地']
             // '耕地', '园地', '林地', '草地', '城镇村及工矿用地', '交通运输用地', '水域及水利设施用地', '其他土地'
           }, */
          series: [
            {
              name: '百分比数据',
              type: 'pie',
              radius: ['40%', '70%'],
              center: ['60%', '60%'],
              data: [
                { value: 67.3, name: '转包' },
                { value: 0.4, name: '转让' },
                { value: 0, name: '互换' },
                { value: 29.4, name: '出租' },
                { value: 0.4, name: '入股' },
                { value: 2.6, name: '其他' }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
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
    getEchartData2() {
      const chart = this.$refs.chart2
      if (chart) {
        const myChart = this.$echarts.init(chart)
        const option = {  title: {
            text: '中部地区'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          /* legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耕地', '园地', '林地', '草地', '城镇村及工矿用地', '交通运输用地', '水域及水利设施用地', '其他土地']
            // '耕地', '园地', '林地', '草地', '城镇村及工矿用地', '交通运输用地', '水域及水利设施用地', '其他土地'
          }, */
          series: [
            {
              name: '百分比数据',
              type: 'pie',
              radius: ['40%', '70%'],
              center: ['60%', '60%'],
              data: [
                { value: 69.4, name: '转包' },
                { value: 0.3, name: '转让' },
                { value: 0, name: '互换' },
                { value: 18.5, name: '出租' },
                { value: 0.5, name: '入股' },
                { value: 11.3, name: '其他' }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
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
    getEchartData3() {
      const chart = this.$refs.chart3
      if (chart) {
        const myChart = this.$echarts.init(chart)
        const option = {   title: {
            text: '西部地区'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          /* legend: {
             orient: 'vertical',
             left: 'left',
             data: ['耕地', '园地', '林地', '草地', '城镇村及工矿用地', '交通运输用地', '水域及水利设施用地', '其他土地']
             // '耕地', '园地', '林地', '草地', '城镇村及工矿用地', '交通运输用地', '水域及水利设施用地', '其他土地'
           }, */
          series: [
            {
              name: '百分比数据',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              labelLine: {
                show: false
              },
              center: ['60%', '60%'],
              data: [
                { value: 58.4, name: '转包' },
                { value: 0.2, name: '转让' },
                { value: 0.8, name: '互换' },
                { value: 33.2, name: '出租' },
                { value: 5.7, name: '入股' },
                { value: 1.6, name: '其他' }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
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
  height: 50vh;
  width: 50vh;
}
</style>
