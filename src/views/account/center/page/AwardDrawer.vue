<template>
  <div>
    <a slot="action" @click="showDrawer">获奖材料提交</a>
    <a-drawer
      title="获奖材料提交"
      :width="720"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <h2 style="color: #1890ff">您的晋级状态为：{{ status }}</h2>
      <h3>建议在竞赛名称后加上日期如2023-5-14</h3>
      <a-form :form="form" layout="vertical" hide-required-mark>
        <a-row :gutter="16">
          <a-col :span="7">
            <a-form-item label="竞赛名称">
              <a-input
                v-decorator="[
                  'activityName',
                  {
                    rules: [{ required: true, message: '请输入竞赛名称：' }],
                  },
                ]"
                placeholder="请输入竞赛名称："
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="16">
            <a-form-item label="团队名">
              <a-input
                v-decorator="[
                  'teamName',
                  {
                    rules: [{ required: true, message: '团队名' }],
                  },
                ]"
                placeholder="团队名"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <P style="color: #1890ff">将获奖证书以pdf格式上传至服务器，该文件将作为评奖评优证明材料之一</P><br>
        <p style="color: #1890ff">pdf命名： 年份+竞赛名+团队名+项目名+奖项等级</p>
        <p style="color: #1890ff">重复提交将导致旧文件被删除，通过下载按钮来确认上传状态</p>
        <upload-modal :team-id="this.teamId" :activity-name="this.activityName" :team-name="this.teamName" :status="status"></upload-modal>
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
import { searchProject, awardUpdate } from '@/api/project'
import AwardUpload from './AwardUpload'
import { downloadPdf } from '@/api/file'
import { saveAs } from 'file-saver'
import axios from 'axios'
let downloadLoadingInstance
export default {
  name: 'AwardDrawer',
  data () {
    return {
      loading: false,
      form: this.$form.createForm(this),
      visible: false,
      status: ''
    }
  },
  components: {
    UploadModal: AwardUpload
  },
  props: {
    teamId: {
      type: String
    },
    teamName: {
      type: String
    },
    activityName: {
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
      downloadPdf(Param).then((res) => {
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
      const teamName = this.form.getFieldValue('teamName')
      const activityName = this.form.getFieldValue('activityName')
      const param = {
        teamName: teamName,
        activityName: activityName,
        teamId: this.teamId,
        status: this.status
      }
      awardUpdate(param).then((res) => {
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
        if (res.data == null || res.data === undefined) {
          this.$message.warn('未查询到项目材料提交，请提交材料供管理员审核')
        }
          if (res.data.status === '暂未设置') {
            this.$message.warn('管理员暂未更改晋级状态，请耐心等待')
          }
            this.$message.success('晋级状态查询成功')
            this.status = res.data.status
        this.form.setFieldsValue({
          teamName: this.teamName,
          activityName: this.activityName
        })
      })
    },
    onClose () {
      this.visible = false
    }
  }
}
</script>
