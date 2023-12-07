<template>
  <div class="clearfix">
    <a-upload :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload">
      <a-button>
        <upload-outlined></upload-outlined>
        选择pdf
      </a-button>
    </a-upload>
    <a-button
      type="primary"
      :disabled="fileList.length === 0"
      :loading="uploading"
      style="margin-top: 16px"
      @click="handleUpload"
    >
      {{ uploading ? '上传中' : '开始上传' }}
    </a-button>
  </div>
</template>

<script>
import { message } from 'ant-design-vue'
import { defineComponent, ref, toRefs } from 'vue'
import { uploadPdf } from '@/api/activity'
import { addAwardUrl } from '@/api/file'

export default defineComponent({
  name: 'AwardUpload',
  props: {
    teamId: String,
    teamName: String,
    activityName: String,
    status: String
  },
  setup (props) {
    const { teamId, teamName, activityName, status } = toRefs(props)
    const fileList = ref([])
    const uploading = ref(false)

    const handleRemove = (file) => {
      const index = fileList.value.indexOf(file)
      const newFileList = fileList.value.slice()
      newFileList.splice(index, 1)
      fileList.value = newFileList
    }

    const beforeUpload = (file) => {
      fileList.value = [...fileList.value, file]
      const isZipOrRar = file.name.endsWith('.pdf')
      if (!isZipOrRar) {
        message.warn('仅支持上传.pdf文件！ ૮₍ꐦ -᷅ ⤙ -᷄ ₎ა ')
        return true
      }
      return false
    }

    const handleUpload = () => {
      const formData = new FormData()
      fileList.value.forEach((file) => {
        formData.append('multipartFile', file)
      })
      uploading.value = true
      uploadPdf(formData)
        .then((res) => {
          fileList.value = []
          uploading.value = false
          message.success('上传成功')
          const urlAddParam = {
            teamId: teamId.value,
            teamName: teamName.value,
            activityName: activityName.value,
            ossId: res.data.ossId,
            status: status.value
          }
          console.log(urlAddParam)
          addAwardUrl(urlAddParam).then((res) => {
            console.log(res.data)
          })
        })
        .catch((res) => {
          uploading.value = false
          const urlAddParam = {
            teamId: teamId.value,
            teamName: teamName.value,
            activityName: activityName.value,
            ossId: res.data.ossId,
            status: status.value
          }
          console.log(urlAddParam)
          addAwardUrl(urlAddParam).then((res) => {
            console.log(res.data)
          })
        })
    }

    return {
      teamId,
      fileList,
      uploading,
      handleRemove,
      beforeUpload,
      handleUpload
    }
  }
})
</script>
