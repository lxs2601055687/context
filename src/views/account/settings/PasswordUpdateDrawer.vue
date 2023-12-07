<template>
  <div>
    <a slot="action" @click="showDrawer">修改</a>
    <a-drawer
      title="修改密码"
      :width="720"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <a-form :form="form" layout="vertical" hide-required-mark>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="旧密码">
              <a-input
                v-decorator="[
                  'oldPassword',
                  {
                    rules: [{ required: true, message: '请输入旧密码' }],
                  },
                ]"
                placeholder="请输入旧密码"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="新密码">
              <a-input
                v-decorator="[
                  'newPassword',
                  {
                    rules: [{ required: true, message: '请输入新密码' }],
                  },
                ]"
                placeholder="请输入新密码"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="新密码">
              <a-input
                v-decorator="[
                  'newPassword2',
                  {
                    rules: [{ required: true, message: '请再次输入' }],
                  },
                ]"
                style="width: 100%"
                placeholder="请再次输入"
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
import { passwordUpdate } from '@/api/login'
export default {
  name: 'PasswordUploadDrawer',
  data () {
    return {
      form: this.$form.createForm(this),
      visible: false
    }
  },
  methods: {
    onSubmit () {
      const oldPassword = this.form.getFieldValue('oldPassword')
      const newPassword = this.form.getFieldValue('newPassword')
      const newPassword2 = this.form.getFieldValue('newPassword2')
      if (oldPassword == null) {
        this.$message.warn('请输入旧密码')
      }
      if (newPassword !== newPassword2) {
        this.$message.warn('两次输入的密码不一致')
      } else {
        const passwordUpdateParam = {
          uid: this.$store.getters.userInfo.uid,
          oldPassword: oldPassword,
          newPassword: newPassword
        }
        console.log(passwordUpdateParam)
        passwordUpdate(passwordUpdateParam).then((res) => {
          if (res.data === newPassword) {
            this.$message.success('密码更改成功 您的新密码为' + newPassword)
            this.onClose()
          }
        })
      }
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
