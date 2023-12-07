<template>
  <div>
    <a slot="action" @click="showDrawer">修改</a>
    <a-drawer
      title="修改密保手机"
      :width="720"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <a-form :form="form" layout="vertical" hide-required-mark>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="手机号：">
              <a-input
                v-decorator="[
                  'phone',
                  {
                    rules: [{ required: true, message: '请输入新的密保手机' }],
                  },
                ]"
                placeholder="请输入手机号"
              />
            </a-form-item>
            <a-button type="primary" @click="submitCode" :loading="loading">发送验证码</a-button>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="7">
            <a-form-item label="验证码：">
              <a-input
                v-decorator="[
                  'code',
                  {
                    rules: [{ required: true, message: '请输入验证码' }],
                  },
                ]"
                placeholder="请输入验证码"
              />
            </a-form-item>
          </a-col>
        </a-row>
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
          修改
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
import { getSmsCaptcha2, phoneUpdate } from '@/api/login'
export default {
  name: 'PhoneUploadDrawer',
  data () {
    return {
      loading: false,
      form: this.$form.createForm(this),
      visible: false
    }
  },
  methods: {
    submitCode () {
      this.loading = true
      const smsParam = {
        mobile: this.form.getFieldValue('phone')
      }
      getSmsCaptcha2(smsParam).then((res) => {
        if (res.data === '成功') {
          this.$message.success('短信已发送请注意查收')
          setTimeout(() => {
            // 赋值新的变量值，例如设为 true
            this.loading = false
          }, 60000)
          this.$message.success('一分钟内请勿重复点击')
        }
      })
    },
    onSubmit () {
      const phone = this.form.getFieldValue('phone')
      const code = this.form.getFieldValue('code')
      const phoneUpdateParam = {
        phone: phone,
        code: code,
        uid: this.$store.getters.userInfo.uid
      }
      phoneUpdate(phoneUpdateParam).then((res) => {
        if (res.data === true) {
          this.$message.success('修改成功')
        } else {
           this.$message.warn('后台出现错误， 请联系技术人员')
        }
      })
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
