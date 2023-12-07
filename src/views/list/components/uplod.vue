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
import { UploadOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { defineComponent, ref, toRefs } from 'vue'
import { uploadActivity } from '@/api/activity'

export default defineComponent({
  components: {
    UploadOutlined
  },
  name: 'UploadActivity',
  props: {
    activityId: String
  },
  setup (props) {
    const { activityId } = toRefs(props)
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
      return false
    }

    const handleUpload = () => {
      const formData = new FormData()
      fileList.value.forEach((file) => {
        formData.append('multipartFile', file)
      })
      formData.append('activityId', activityId.value)
      uploading.value = true
      uploadActivity(formData)
        .then(() => {
          console.log(activityId.value)
          fileList.value = []
          uploading.value = false
          message.success('上传成功')
        })
        .catch(() => {
          uploading.value = false
          message.error('上传失败')
        })
    }

    return {
      activityId,
      fileList,
      uploading,
      handleRemove,
      beforeUpload,
      handleUpload
    }
  }
})
</script>
