<template>
<!--  <v-chart class="chart" :option="option" autoresize id="chart"/>-->
  <div class="chart" ref="chart"></div>
</template>

<script>
import { use } from 'echarts/core'
import { init, registerTheme } from 'echarts'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, BarChart } from 'echarts/charts'
import walden from '@/views/dashboard/Echarts/walden.json'
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
  name: 'classificationArea',
  data() {
    return {
      option: {
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '15%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
        },
        yAxis: {
          type: 'category',
          data: [
            '耕地',
            '种植园用地',
            '林地',
            '草地',
            '湿地',
            '城镇/工矿',
            '交通运输',
            '水域/水利',
          ],
        },
        series: [
          {
            name: '水田',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [28321.57],
          },
          {
            name: '水浇地',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [39.21],
          },
          {
            name: '旱地',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [15345.4],
          },
          {
            name: '果园',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 16322.38],
          },
          {
            name: '茶园',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0.97],
          },
          {
            name: '橡胶园',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 21090.17],
          },
          {
            name: '其他园地',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 23024.35],
          },
          {
            name: '乔木',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0, 30580.34],
          },
          {
            name: '竹林',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0, 16322.38],
          },
          {
            name: '灌木',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0, 14885.73],
          },
          {
            name: '天然牧草地',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0, 0, 0],
          },
          {
            name: '人工牧草地',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0, 0, 35.1],
          },
          {
            name: '其他草地',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0, 0, 3374.67],
          },
          {
            name: '红树林地',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0, 0, 0, 1901.93],
          },
          {
            name: '森林沼泽',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0, 0, 0, 0],
          },
          {
            name: '灌丛沼泽',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0, 0, 0, 0],
          },
          {
            name: '沼泽草地',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0, 0, 0, 0.08],
          },
          {
            name: '沿海滩涂',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0, 0, 0, 4238.72],
          },
          {
            name: '内陆滩涂',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0, 0, 0, 634.82],
          },
          {
            name: '沼泽地',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0, 0, 0, 0],
          },
          {
            name: '城市',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0, 0, 0, 0, 12347.34],
          },
          {
            name: '建制镇',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0, 0, 0, 0, 9602.74],
          },
          {
            name: '村庄',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0, 0, 0, 0, 13392.01],
          },
          {
            name: '采矿用地',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0, 0, 0, 0, 707.04],
          },
          {
            name: '风景名胜及特殊用地',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0, 0, 0, 0, 1032.07],
          },
          {
            name: '铁路用地',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0, 0, 0, 0, 0, 316.55],
          },
          {
            name: '轨道交通用地',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0, 0, 0, 0, 0, 0],
          },
          {
            name: '公路用地',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0, 0, 0, 0, 0, 2919.92],
          },
          {
            name: '农村道路',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0, 0, 0, 0, 0, 2809.14],
          },
          {
            name: '机场用地',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0, 0, 0, 0, 0, 1081.95],
          },
          {
            name: '港口码头用地',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0, 0, 0, 0, 0, 193.57],
          },
          {
            name: '管道运输用地',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0, 0, 0, 0, 0, 1.08],
          },
          {
            name: '河流水面',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0, 0, 0, 0, 0, 0, 4434.19],
          },
          {
            name: '湖泊水面',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0, 0, 0, 0, 0, 0, 11.68],
          },
          {
            name: '水库水面',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0, 0, 0, 0, 0, 0, 3522.07],
          },
          {
            name: '坑塘水面',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0, 0, 0, 0, 0, 0, 7648.97],
          },
          {
            name: '沟渠',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0, 0, 0, 0, 0, 0, 1103.95],
          },
          {
            name: '水工建筑用地',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [0, 0, 0, 0, 0, 0, 0, 471.93],
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
        const option = { tooltip: {
            trigger: 'item',
            axisPointer: {
              type: 'shadow',
            },
          },
          legend: {},
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '15%',
            containLabel: true,
          },
          xAxis: {
            type: 'value',
          },
          yAxis: {
            type: 'category',
            data: [
              '耕地',
              '种植园用地',
              '林地',
              '草地',
              '湿地',
              '城镇/工矿',
              '交通运输',
              '水域/水利',
            ],
          },
          series: [
            {
              name: '水田',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [28321.57],
            },
            {
              name: '水浇地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [39.21],
            },
            {
              name: '旱地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [15345.4],
            },
            {
              name: '果园',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 16322.38],
            },
            {
              name: '茶园',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0.97],
            },
            {
              name: '橡胶园',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 21090.17],
            },
            {
              name: '其他园地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 23024.35],
            },
            {
              name: '乔木',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0, 30580.34],
            },
            {
              name: '竹林',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0, 16322.38],
            },
            {
              name: '灌木',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0, 14885.73],
            },
            {
              name: '天然牧草地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0, 0, 0],
            },
            {
              name: '人工牧草地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0, 0, 35.1],
            },
            {
              name: '其他草地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0, 0, 3374.67],
            },
            {
              name: '红树林地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0, 0, 0, 1901.93],
            },
            {
              name: '森林沼泽',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0, 0, 0, 0],
            },
            {
              name: '灌丛沼泽',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0, 0, 0, 0],
            },
            {
              name: '沼泽草地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0, 0, 0, 0.08],
            },
            {
              name: '沿海滩涂',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0, 0, 0, 4238.72],
            },
            {
              name: '内陆滩涂',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0, 0, 0, 634.82],
            },
            {
              name: '沼泽地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0, 0, 0, 0],
            },
            {
              name: '城市',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0, 0, 0, 0, 12347.34],
            },
            {
              name: '建制镇',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0, 0, 0, 0, 9602.74],
            },
            {
              name: '村庄',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0, 0, 0, 0, 13392.01],
            },
            {
              name: '采矿用地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0, 0, 0, 0, 707.04],
            },
            {
              name: '风景名胜及特殊用地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0, 0, 0, 0, 1032.07],
            },
            {
              name: '铁路用地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0, 0, 0, 0, 0, 316.55],
            },
            {
              name: '轨道交通用地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0, 0, 0, 0, 0, 0],
            },
            {
              name: '公路用地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0, 0, 0, 0, 0, 2919.92],
            },
            {
              name: '农村道路',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0, 0, 0, 0, 0, 2809.14],
            },
            {
              name: '机场用地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0, 0, 0, 0, 0, 1081.95],
            },
            {
              name: '港口码头用地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0, 0, 0, 0, 0, 193.57],
            },
            {
              name: '管道运输用地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0, 0, 0, 0, 0, 1.08],
            },
            {
              name: '河流水面',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0, 0, 0, 0, 0, 0, 4434.19],
            },
            {
              name: '湖泊水面',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0, 0, 0, 0, 0, 0, 11.68],
            },
            {
              name: '水库水面',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0, 0, 0, 0, 0, 0, 3522.07],
            },
            {
              name: '坑塘水面',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0, 0, 0, 0, 0, 0, 7648.97],
            },
            {
              name: '沟渠',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0, 0, 0, 0, 0, 0, 1103.95],
            },
            {
              name: '水工建筑用地',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [0, 0, 0, 0, 0, 0, 0, 471.93],
            },
          ], }
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