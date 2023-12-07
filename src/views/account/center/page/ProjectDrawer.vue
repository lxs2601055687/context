<template>
  <div>
    <a slot="action" @click="showDrawer">项目材料提交</a>
    <a-drawer
      title="项目材料提交"
      :width="720"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <H2 style="color: lightskyblue">您的团队id为：{{ teamId }}</H2>
      <a-form :form="form" layout="vertical" hide-required-mark>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="项目名称(请在项目名称前加上竞赛名称并以—隔开)">
              <a-input
                v-decorator="[
                  'projectName',
                  {
                    rules: [{ required: true, message: '请输入项目名：' }],
                  },
                ]"
                placeholder="请输入项目名："
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="16">
            <a-form-item label="网页链接（如果项目已在云服务器部署可填写，没有可不填）：">
              <a-input
                v-decorator="[
                  'web',
                  {
                    rules: [{ required: true, message: '网址' }],
                  },
                ]"
                placeholder="请输入网址"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="16">
            <a-form-item label="百度网盘链接：(用于存放其他资料)">
              <a-input
                v-decorator="[
                  'disk',
                  {
                    rules: [{ required: false, message: '网址：' }],
                  },
                ]"
                placeholder="请输入网址："
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="16">
            <a-form-item label="作品简介">
              <a-textarea
                v-decorator="[
                  'description',
                  {
                    rules: [{ required: false, message: '作品简介：' }],
                  },
                ]"
                placeholder="请输入作品简介："
              />
            </a-form-item>
          </a-col>
        </a-row>
        <P style="color: #1890ff">请队长上传压缩包，包含作品说明书，ppt，作品演示视频</P><br>
        <p style="color: #1890ff">压缩包命名： 年份+竞赛名+团队名+项目名</p>
        <p style="color: #1890ff">重复提交将导致旧文件被删除，通过下载按钮来确认上传状态</p>
        <upload-modal :team-id="teamId"></upload-modal>
        <a-button @click="downloadZip"><a>下载资料</a></a-button>
      </a-form>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="onClose">
          取消
        </a-button>
        <a-button type="primary" @click="onSubmit">
          提交
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
import { projectUpdate, searchProject } from '@/api/project'
import UploadModal from './projectUpload'
import { downloadZip } from '@/api/file'
import { saveAs } from 'file-saver'
import axios from 'axios'
let downloadLoadingInstance
export default {
  name: 'ProjectDrawer',
  data () {
    return {
      loading: false,
      form: this.$form.createForm(this),
      visible: false
    }
  },
  components: {
    UploadModal: UploadModal
  },
  props: {
    teamId: {
      type: String
    },
    teamName: {
      type: String
    }
  },
  mounted () {
  },
  methods: {
    downloadZip () {
      const Param = {
        teamId: this.teamId
      }
      downloadZip(Param).then((res) => {
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
    onSubmit () {
      const disk = this.form.getFieldValue('disk')
      const projectName = this.form.getFieldValue('projectName')
      const web = this.form.getFieldValue('web')
      const description = this.form.getFieldValue('description')
      const ProjectParam = {
        disk: disk,
        projectName: projectName,
        web: web,
        description: description,
        teamId: this.teamId,
        teamName: this.teamName
      }
      projectUpdate(ProjectParam).then((res) => {
        if (res.data === true) {
          this.$message.success('数据更新成功(๑•̀ㅂ•́)و✧')
        } else {
          this.$message.warn('后台出了小问题，联系管理员 Σ( ° △ °|||)')
        }
      })
    },
    showDrawer () {
      this.visible = true
      const searchParam = {
        teamId: this.teamId
      }
      searchProject(searchParam).then((res) => {
        if (res.data == null) {
          this.$message.success('基本信息还无人填写，快去完善(* ￣3)(ε￣ *)')
        } else {
          this.form.setFieldsValue({
            web: res.data.web,
            disk: res.data.disk,
            description: res.data.description,
            projectName: res.data.projectName
          })
        }
      })
    },
    onClose () {
      this.visible = false
    }
  }
}
</script>
