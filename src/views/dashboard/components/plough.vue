/* eslint-disable */
<!--
<template>
  <div>
&lt;!&ndash;    <a-checkbox :checked="checked" @change="handlePlough" id="plough">耕地图层</a-checkbox>
    <a-checkbox :checked="checked2" @change="handleLin">林地图层</a-checkbox>
    <a href='https://localhost:63342/新建文件夹%20(3)/index.html?_ijt=evmjlt6p3chts0nasmbj0kadcg&_ij_reload=RELOAD_ON_SAVE' target='_blank'>一张图</a>&ndash;&gt;
    <div style="padding: 0; margin: 0; min-height: 700px; width: 100%;" id="mapDiv"></div></div>
</template>

<script>
import { loadModules } from 'esri-loader'
export default {
  name: 'Plough',
  data () {
    return {
      map: null,
      checked: true,
      checked2: true,
      url: 'https://124.222.172.26:6443/arcgis/rest/services//plough/耕地图层/MapServer',
      url2: 'https://124.222.172.26:6443/arcgis/rest/services//林地/MapServer',
      layer: null,
      layer2: null
    }
  },
  mounted () {
    this.createMap()
  },
     methods: {
       createMap: function () {
         const options = {
           url: 'https://js.arcgis.com/3.25/',
           css: 'https://js.arcgis.com/3.25/esri/css/esri.css'
         }
         console.log(loadModules, 1111)
       loadModules(['esri/map', 'esri/layers/ArcGISDynamicMapServiceLayer', 'esri/geometry/geometryEngine'], options).then(([ Map, ArcGISDynamicMapServiceLayer ]) => {
         console.log(Map, 1111)
         console.log(ArcGISDynamicMapServiceLayer)
            this.map = new Map('mapDiv', {
           center: [109.8449, 19.0399], // Longitude, latitude
           zoom: 8, // Zoom levela
           basemap: 'streets'
         })
          // const url = 'https://124.222.172.26:6443/arcgis/rest/services//MyMapService/MapServer'
           const url = 'https://124.222.172.26:6443/arcgis/rest/services//plough/耕地图层/MapServer'
          this.layer = new ArcGISDynamicMapServiceLayer(url)
         this.map.addLayer(this.layer)
          const url2 = 'https://120.77.246.73:6443/arcgis/rest/services/server/%E6%B5%B7%E5%8D%97%E6%80%BB%E8%A7%84%E7%94%A8%E5%9C%B0/MapServer'
         this.layer2 = new ArcGISDynamicMapServiceLayer(url2)
         this.map.addLayer(this.layer2)
       })
       },
        handlePlough () {
         this.checked = !this.checked
         console.log(this.checked)
         if (this.checked === false) {
           this.map.removeLayer(this.layer)
         }
         if (this.checked === true) {
           this.map.addLayer(this.layer)
         }
       },
       handleLin () {
         this.checked2 = !this.checked2
         console.log(this.checked2)
         if (this.checked2 === false) {
           this.map.removeLayer(this.layer2)
         }
         if (this.checked2 === true) {
           this.map.addLayer(this.layer2)
         }
       }
     }

  }
</script>

<style scoped>

</style>
-->
<template>
  <div>
    <div id='components-button-demo-button-group'>
      <a-button-group>
        <a-button type='primary' size='small' @click="showModal"  >
        查询节点
      </a-button>
      <a-button  type='primary' size='small' :loading='graphLoading' @click="resetData">
        查询全部
      </a-button>
      </a-button-group>
      <a-modal
        title="查询节点"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <a-input placeholder="输入节点查询"  v-model='input'></a-input>
      </a-modal>
    </div>
    <div style="margin-top:0px;width: calc(100% - 10px);height:calc(100vh - 200px); background: #cccccc">
      <RelationGraph ref="seeksRelationGraph" :options="graphOptions" />
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
 //import RelationGraph from 'relation-graph';
import { getGraph,searchGraph } from '@/api/graph'
export default {
  name: 'Plough',
  components: { }, // 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要在这里注册：components: { RelationGraph }
  data() {
    return {
      graphLoading: false,
      input: '',
      visible: false,
      confirmLoading: false,
      graphData: {},
      g_loading: true,
      demoname: '---',
      checked_sex: '',
      checked_isgoodman: '',
      graphRootData: {},
      graphOptions: {
        "isMoveByParentNode": true,
        "defaultLineColor": "rgba(0, 206, 209, 1)",
        "defaultLineWidth": 1,
        "defaultNodeWidth": "65",
        "defaultNodeHeight": "65",
        defaultNodeBorderWidth: 0,
        defaultNodeColor: 'rgba(238, 178, 94, 1)',
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultLineShape: 1,
        'layouts': [
          {
            'label': '中心',
            'layoutName': 'force',
            'layoutClassName': 'seeks-layout-force'
          }
        ],
        defaultJunctionPoint: 'border'

        // 这里可以参考"Graph 图谱"中的参数进行设置
      }
    }
  },
  created() {
    getGraph().then(res => {
      this.graphData =  res.data
      this.graphRootData = res.data
      console.log(this.graphData)
    })
  },
  mounted() {
    this.demoname = this.$route.params.demoname;
    setTimeout(() => {
      this.setGraphData();
    },3000)
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    resetData() {
      this.graphLoading = true
      this.$refs.seeksRelationGraph.setJsonData(this.graphRootData, (graphInstance) => {
        this.graphLoading = false
      })
    },
    handleOk(e) {
      if(this.input === '') {
        this.$message.warn('请输入查询条件')
      } else {
        this.confirmLoading = true;
        searchGraph(this.input).then(res => {
          this.graphData = res.data
        })
        setTimeout(() => {
          this.visible = false;
          this.confirmLoading = false;
          this.setGraphData()
        }, 4000);
      }
    },
    handleCancel(e) {
      this.visible = false;
    },
    setGraphData() {
     console.log(this.graphData)
      this.$refs.seeksRelationGraph.setJsonData(this.graphData, (graphInstance) => {
      })
    },
    doFilter() {
      const _all_nodes = this.$refs.seeksRelationGraph.getInstance().getNodes()
      const _all_links = this.$refs.seeksRelationGraph.getInstance().getLinks()
      _all_nodes.forEach(thisNode => {
        let _isHideThisLine = false
        if (this.checked_sex !== '') {
          if (thisNode.data['sexType'] !== this.checked_sex) {
            _isHideThisLine = true
          }
        }
        if (this.checked_isgoodman !== '') {
          if (thisNode.data['isGoodMan'] !== this.checked_isgoodman) {
            _isHideThisLine = true
          }
        }
        thisNode.opacity = _isHideThisLine ? 0.1 : 1
      });
      _all_links.forEach(thisLink => {
        thisLink.relations.forEach(thisLine => {
          if (this.rel_checkList.indexOf(thisLine.data['type']) === -1) {
            if (!thisLine.isHide) {
              thisLine.isHide = true
              console.log('Hide line:', thisLine)
            }
          } else {
            if (thisLine.isHide) {
              thisLine.isHide = false
              console.log('Show line:', thisLine)
            }
          }
        })
        // thisNode.opacity = _isShowThisNode ? 1 : 0.1
      })
      this.$refs.seeksRelationGraph.getInstance().dataUpdated()
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.c-my-node{
  background-position: center center;
  background-size: 100%;
  border:#ff8c00 solid 2px;
  height:80px;
  width:80px;
  border-radius: 40px
}
.c-node-name{
  width:160px;
  margin-left:-40px;
  text-align:center;
  margin-top:85px
}
#components-button-demo-button-group  {
  font-size: 14px;
  line-height: 1;
  font-weight: normal;
  border: dodgerblue;
}

</style>