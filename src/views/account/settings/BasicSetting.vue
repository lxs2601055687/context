<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16" type="flex" justify="center">
      <a-col :order="isMobile ? 2 : 1" :md="24" :lg="16">

        <a-form layout="vertical" :form="form">
          <a-form-item
            :label="$t('account.settings.basic.uid')"
          >
            <a-input
              :placeholder="$t('account.settings.basic.uid-message')"
              v-decorator="['uid', {rules: [{ required: true }]}]"
              :disabled="true"/>
          </a-form-item>
          <a-form-item
            :label="$t('account.settings.basic.phone')"
          >
            <a-input
              :placeholder="$t('account.settings.basic.phone-message')"
              v-decorator="['phone', {rules: [{ required: true }]}]"
              :disabled="true"/>
          </a-form-item>
          <a-form-item
            :label="$t('account.settings.basic.code')"
          >
            <a-input
              :placeholder="$t('account.settings.basic.code')"
              v-decorator="['invitation', {rules: [{ required: true }]}]"
              :disabled="true"/>
          </a-form-item>
          <a-form-item
            :label="$t('account.settings.basic.username')"
          >
            <a-input
              :placeholder="$t('account.settings.basic.username-message')"
              v-decorator="['name', {rules: [{ required: true }]}]"/>
          </a-form-item>
          <a-form-item
            :label="$t('account.settings.basic.grade')"
          >
            <a-input
              :placeholder="$t('account.settings.basic.grade-message')"
              v-decorator="['grade', {rules: [{ required: true }]}]"/>
          </a-form-item>
          <a-form-item
            :label="$t('account.settings.basic.college')"
          >
            <a-input
              :placeholder="$t('account.settings.basic.college-message')"
              v-decorator="['academy', {rules: [{ required: true }]}]"/>
          </a-form-item>
          <a-form-item
            :label="$t('account.settings.basic.subject')"
          >
            <a-input
              :placeholder="$t('account.settings.basic.subject-message')"
              v-decorator="['specializedSubject', {rules: [{ required: true }]}]"/>
          </a-form-item>
          <a-form-item
            :label="$t('account.settings.basic.profile')"
          >
            <a-textarea
              rows="4"
              :placeholder="$t('account.settings.basic.profile-message')"
              v-decorator="['profile', {rules: [{ required: true }]}]"/>
          </a-form-item>

          <a-form-item
            :label="$t('account.settings.basic.email')"
            :required="false"
          >
            <a-input
              placeholder="example@ant.design"
              v-decorator="['email', {rules: [{ required: true }]}]"
            />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="updateUserInfo">{{ $t('account.settings.basic.update') }}</a-button>
          </a-form-item>
        </a-form>

      </a-col>
      <a-col :order="1" :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <div class="ant-upload-preview" @click="$refs.modal.edit(1)" >
          <a-icon type="cloud-upload-o" class="upload-icon"/>
          <div class="mask">
            <a-icon type="plus" />
          </div>
          <img :src="option.img"/>
        </div>
      </a-col>

    </a-row>

    <avatar-modal ref="modal" @ok="setavatar"/>

  </div>
</template>

<script>
import AvatarModal from './AvatarModal'
import { baseMixin } from '@/store/app-mixin'
import { getInfo, userInfoUpdate } from '@/api/login'

export default {
  mixins: [baseMixin],
  components: {
    AvatarModal
  },
  data () {
    return {
      // cropper
      form: this.$form.createForm(this),
      preview: {},
      option: {
        img: '/avatar2.jpg',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      }
    }
  },
  mounted () {
    getInfo().then(res => (
      // eslint-disable-next-line no-sequences
      this.form.setFieldsValue({
        name: res.data.name,
        grade: res.data.grade,
        uid: res.data.uid,
        email: res.data.email,
        academy: res.data.academy,
        phone: res.data.phone,
        specializedSubject: res.data.specializedSubject,
        profile: res.data.profile,
        invitation: res.data.invitation
      })
    ))
  },
  methods: {
    setavatar (url) {
      this.option.img = url
    },
    updateUserInfo () {
      const grade = this.form.getFieldValue('grade')
      const uid = this.form.getFieldValue('uid')
      const email = this.form.getFieldValue('email')
      const profile = this.form.getFieldValue('profile')
      const specializedSubject = this.form.getFieldValue('specializedSubject')
      const academy = this.form.getFieldValue('academy')
      const name = this.form.getFieldValue('name')
      const updateUserInfoParam = {
        grade: grade,
        academy: academy,
        name: name,
        specializedSubject: specializedSubject,
        profile: profile,
        email: email,
        uid: uid
      }
      userInfoUpdate(updateUserInfoParam).then(res => {
        this.$message.success('账户' + res.data + '更改成功请再次确认账号无误这很重要')
        this.$store.dispatch('GetInfo')
      })
    }
  }
}
</script>

<style lang="less" scoped>

  .avatar-upload-wrapper {
    height: 200px;
    width: 100%;
  }

  .ant-upload-preview {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;

    .upload-icon {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 1.4rem;
      padding: 0.5rem;
      background: rgba(222, 221, 221, 0.7);
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
    .mask {
      opacity: 0;
      position: absolute;
      background: rgba(0,0,0,0.4);
      cursor: pointer;
      transition: opacity 0.4s;

      &:hover {
        opacity: 1;
      }

      i {
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        color: #d6d6d6;
      }
    }

    img, .mask {
      width: 100%;
      max-width: 180px;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
  }
</style>
