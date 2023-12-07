<template>
  <div>
    <div class="chart" ref="chart"></div>
  </div>
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
  name: 'provinceLand',

  data() {
    const labelOption = {
      show: true,
      position: 'top',
      distance: 5,
      align: 'center',
      verticalAlign: 'middle',
      rotate: 0,
      formatter: '{c}',
      fontSize: 12,
      rich: {}
    };

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['Forest', 'Steppe', 'Desert', 'Wetland']
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: ['海口市', '三亚市', '儋州市', '五指山市', '文昌市', '琼海市', '万宁市', '定安县', '屯昌县', '澄迈县', '临高县', '东方市', '乐东县', '琼中县', '保亭县', '陵水县', '白沙县', '昌江县']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '耕地',
          type: 'bar',
          barGap: 0,
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [50487, 15073, 49500, 3268, 40691, 23002, 18899, 25140, 13333, 29755, 29634, 48640, 30292, 9969, 5940, 11459, 10254, 23625]
        },
        {
          name: '水旱地',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [26495, 12916, 24383, 2973, 32039, 16797, 12748, 11274, 8987, 18070, 18402, 16702, 17238, 5199, 5554, 8963, 4452, 6183]
        },
        {
          name: '水田',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [23992, 2157, 25117, 294, 8652, 6204, 6151, 13866, 4345, 11685, 11232, 31939, 13054, 4769, 387, 2496, 5802, 17442]
        },
        {
          name: '旱地',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [17834, 10201, 16011, 2799, 25114, 13943, 10741, 10767, 7069, 15422, 12624, 12330, 11326, 4436, 5508, 6772, 3184, 4328]
        }
      ]
    };

    return {
      option,
      labelOption
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
        const option = { tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['Forest', 'Steppe', 'Desert', 'Wetland']
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar', 'stack'] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          xAxis: [
            {
              type: 'category',
              axisTick: { show: false },
              data: ['海口市', '三亚市', '儋州市', '五指山市', '文昌市', '琼海市', '万宁市', '定安县', '屯昌县', '澄迈县', '临高县', '东方市', '乐东县', '琼中县', '保亭县', '陵水县', '白沙县', '昌江县']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '耕地',
              type: 'bar',
              barGap: 0,
              label: this.labelOption,
              emphasis: {
                focus: 'series'
              },
              data: [50487, 15073, 49500, 3268, 40691, 23002, 18899, 25140, 13333, 29755, 29634, 48640, 30292, 9969, 5940, 11459, 10254, 23625]
            },
            {
              name: '水旱地',
              type: 'bar',
              label: this.labelOption,
              emphasis: {
                focus: 'series'
              },
              data: [26495, 12916, 24383, 2973, 32039, 16797, 12748, 11274, 8987, 18070, 18402, 16702, 17238, 5199, 5554, 8963, 4452, 6183]
            },
            {
              name: '水田',
              type: 'bar',
              label: this.labelOption,
              emphasis: {
                focus: 'series'
              },
              data: [23992, 2157, 25117, 294, 8652, 6204, 6151, 13866, 4345, 11685, 11232, 31939, 13054, 4769, 387, 2496, 5802, 17442]
            },
            {
              name: '旱地',
              type: 'bar',
              label: this.labelOption,
              emphasis: {
                focus: 'series'
              },
              data: [17834, 10201, 16011, 2799, 25114, 13943, 10741, 10767, 7069, 15422, 12624, 12330, 11326, 4436, 5508, 6772, 3184, 4328]
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
};
</script>

<style scoped>
.chart {
  height: 90vh;
  width: 190vh;
}
</style>