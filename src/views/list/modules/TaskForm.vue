<template>
  <a-form :form="form" class="parent" ref="formRef">
    <a-form-item
      label="ID(自动生成)"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['activityId', {rules:[{required: false, message: '自动生成无需填入'}]}]" :disabled="true"/>
    </a-form-item>
    <a-form-item
      label="活动名称"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['title', {rules:[{required: true, message: '请输入任务名称'}]}]" />
    </a-form-item>
    <a-form-item
      label="活动官网"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <div style="margin-bottom: 16px">
        <a-input addon-before="Http://" addon-after=".com" v-decorator="['website', {rules:[{required: true, message: '请输入活动负责人'}]}]" />
      </div>
    </a-form-item>
    <a-form-item
      label="活动类型"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-select v-decorator="['type', {rules:[{required: true, message: '请输入活动类型'}]}]">
        <a-select-option value="个人">个人</a-select-option>
        <a-select-option value="团队">团队</a-select-option>
        <a-select-option value="其他">其他</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      label="开始时间"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-date-picker
        style="width: 100%"
        valueFormat="YYYY-MM-DD HH:mm"
        v-decorator="['startAt', {rules:[{required: true, message: '请选择开始时间'}]}]"
      />
    </a-form-item>
    <a-form-item
      label="结束时间"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-date-picker
        style="width: 100%"
        valueFormat="YYYY-MM-DD HH:mm"
        v-decorator="['endAt', {rules:[{required: true, message: '请选择结束时间'}]}]"
      />
    </a-form-item>
    <a-form-item
      label="活动负责人"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['owner', {rules:[{required: true, message: '请输入活动负责人'}]}]" />
    </a-form-item>
    <a-form-item
      label="活动描述"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-textarea v-decorator="['description']"></a-textarea>
      <upload-activity style="display: none" ></upload-activity>
    </a-form-item>
    <a-form-item
      label="上传压缩包"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <upload-activity :activity-id="this.form.getFieldValue('activityId')" class="child3" id="upload"></upload-activity>
    </a-form-item>
    <a-button
      :loading="loading"
      :disabled="loading"
      id="submit"
      type="primary"
      @click="handleSubmit"
      class="child">提交活动</a-button><a-spin id="spin" class="child2"/>
    <a-button
      :loading="loading"
      :disabled="loading"
      id="update"
      type="primary"
      @click="updateSubmit"
      class="child">提交更新</a-button><a-spin id="spin" class="child2"/>
  </a-form>
</template>
<script>
import UploadActivity from '@/views/list/components/uplod'
import pick from 'lodash.pick'
import { addActivity, updateActivity } from '@/api/activity'
const fields = ['activityId', 'title', 'type', 'startAt', 'endAt', 'website', 'owner', 'description']
export default {
  name: 'TaskForm',
  components: { UploadActivity },
  props: {
    record: {
      type: Object,
      default: null
    },
    record2: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      form: this.$form.createForm(this),
      loading: false
    }
  },
  mounted () {
    this.record && this.form.setFieldsValue(pick(this.record, fields))
    if (this.form.getFieldValue(fields[0]) === undefined) {
      document.getElementById('submit').style.visibility = 'visible'
    } else {
      document.getElementById('update').style.visibility = 'visible'
      document.getElementById('upload').style.visibility = 'visible'
    }
  },
  methods: {
    onOk () {
      console.log('监听了 modal ok上 事件')
      console.log('form', this.form)
      const addActivityParams = {
        activityId: this.form.getFieldValue(fields[0]),
        title: this.form.getFieldValue(fields[1]),
        type: this.form.getFieldValue(fields[2]),
        startAt: this.form.getFieldValue(fields[3]),
        endAt: this.form.getFieldValue(fields[4]),
        website: this.form.getFieldValue(fields[5]),
        owner: this.form.getFieldValue(fields[6]),
        description: this.form.getFieldValue(fields[7])
      }
      this.record2 = addActivityParams
      console.log(this.record2)
      return new Promise(resolve => {
        resolve(true)
      })
    },
    onCancel () {
      console.log('监听了 modal cancel 事件')
      return new Promise(resolve => {
        resolve(true)
      })
    },
    handleSubmit () {
      console.log('监听了 submit 事件')
      const addActivityParams = {
        activityId: this.form.getFieldValue(fields[0]),
        name: this.form.getFieldValue(fields[1]),
        type: this.form.getFieldValue(fields[2]),
        startTime: this.form.getFieldValue(fields[3]),
        endTime: this.form.getFieldValue(fields[4]),
        website: this.form.getFieldValue(fields[5]),
        owner: this.form.getFieldValue(fields[6]),
        description: this.form.getFieldValue(fields[7])
      }
      const { form } = this
      form.validateFields((errors) => {
        if (!errors) {
          this.loading = true
          addActivity(addActivityParams).then(() => {
            form.resetFields()
            this.loading = false
          })
        }
      })
    },
    updateSubmit () {
        console.log('更新操作')
        const updateParams = {
          activityId: this.form.getFieldValue(fields[0]),
          name: this.form.getFieldValue(fields[1]),
          type: this.form.getFieldValue(fields[2]),
          startTime: this.form.getFieldValue(fields[3]),
          endTime: this.form.getFieldValue(fields[4]),
          website: this.form.getFieldValue(fields[5]),
          owner: this.form.getFieldValue(fields[6]),
          description: this.form.getFieldValue(fields[7])
        }
        console.log(updateParams)
        this.loading = true
        updateActivity(updateParams).then((res) => {
          this.$message.success(res.data)
          this.loading = false
          this.onCancel()
        }).catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
<style>
.parent {
  position: relative;
}
.child {
  visibility:hidden;
  position: absolute;
  top: 97%;
  left: 70%;
  transform: translate(-50%, -50%);
}
.child2 {
  visibility:hidden;
  position: absolute;
  top: 97%;
  left: 80%;
  transform: translate(-50%, -50%);
}
.child3 {
  visibility: hidden;
}
</style>
