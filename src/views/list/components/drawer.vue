<template>
  <div>
    <a @click="showDrawer">详情</a>
    <a-drawer
      title="竞赛详情"
      placement="top"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <a-button @click="fileDownload(dataSource.activityId)">附件下载</a-button>
      <p>报名结束时间:</p>
      <p>{{ dataSource.endAt }}</p>
      <p>详情</p>
      <p>{{ dataSource.description }}</p>
      <P>竞赛官网</P>
      <P>{{ dataSource.website }}</P>
    </a-drawer>
  </div>
</template>
<script>
import { getFile } from '@/api/file'
import axios from 'axios'
import { saveAs } from 'file-saver'
let downloadLoadingInstance
export default {
  props: {
    dataSource: {
      type: [Array, Object],
      default: () => []
    }
  },

  name: 'Drawer',
  data () {
    return {
      visible: false
    }
  },
  methods: {
    fileDownload (activityId) {
      const activityIdParam = {
        activityId: activityId
      }
      getFile(activityIdParam).then((res) => {
        console.log(res.data)
        if (res.data.length === 0) {
          this.$message.warn('管理员还没上传附件请耐心等待o(￣ヘ￣o＃)')
        }
        for (let o = 0; o < res.data.length; o++) {
          axios({
            method: 'get',
            url: `/api/File/download/${res.data[o]}`,
            responseType: 'blob'
          }).then((response) => {
            console.log(response)
            const downloadFilename = response.headers
            console.log('Download filename:', downloadFilename)
             const blob = new Blob([response.data], { type: 'application/octet-stream' })
            saveAs(blob, decodeURIComponent(response.headers['download-filename']))
            downloadLoadingInstance.close()
          })
        }
      })
    },
    afterVisibleChange (val) {
      console.log('visible', val)
    },
    showDrawer () {
      this.visible = true
    },
    onClose () {
      this.visible = false
    }
  }
}
</script>
