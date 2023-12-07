<template>
  <div class="clearfix">
    <a-upload :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload">
      <a-button>
        <upload-outlined></upload-outlined>
        选择压缩包
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
import { uploadActivity } from '@/api/activity'
import { addUrl } from '@/api/file'

export default defineComponent({
  name: 'UploadModal',
  props: {
    teamId: String
  },
  setup (props) {
    const { teamId } = toRefs(props)
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
      const isZipOrRar = file.name.endsWith('.zip') || file.name.endsWith('.rar')
      if (!isZipOrRar) {
        message.warn('仅支持上传 .zip 或 .rar 格式的压缩包！ ૮₍ꐦ -᷅ ⤙ -᷄ ₎ა ')
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
      uploadActivity(formData)
        .then((res) => {
          fileList.value = []
          uploading.value = false
          message.success('上传成功')
          const urlAddParam = {
            teamId: teamId.value,
            url: res.data.url,
            ossId: res.data.ossId
          }
          console.log(urlAddParam)
          addUrl(urlAddParam).then((res) => {
            console.log(res.data)
          })
        })
        .catch((res) => {
          uploading.value = false
          const urlAddParam = {
            teamId: teamId.value,
            url: res.data.url,
            ossId: res.data.ossId
          }
          console.log(urlAddParam)
          addUrl(urlAddParam).then((res) => {
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
