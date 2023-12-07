<template>
  <a-card-grid style="width: 100%; height: 100%">
    <a-card title="资料展示" style="width: 100%" :key="index" v-for="(item, index) in project">
      <a @click="download(item.teamId)">下载资料</a><br>
      <p>{{ item.projectName }}</p>
      <span>简介：</span><p>{{ item.description }}</p>
    </a-card>
  </a-card-grid>
</template>

<script>
import { projectDownload } from '@/api/project'
import axios from 'axios'
import { saveAs } from 'file-saver'
let downloadLoadingInstance

export default {
  name: 'GoodCard',

  props: {
    project: {}
  },

  methods: {
    download (teamId) {
      projectDownload(teamId).then((res) => {
        if (res.data == null) {
          this.$message.info('该团队并未上传项目材料')
        } else {
            axios({
              method: 'get',
              url: `/api/File/download/${res.data}`,
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
    }
  }
}
</script>

<style scoped>

</style>
