<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item
        label="赛道"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input-group
          style="display: inline-block; vertical-align: middle"
          :compact="true"
        >
          <a-input
            :style="{width: 'calc(100% - 100px)'}"
            v-decorator="['track', {rules:[{required: false, message: '没有可不填'}]}]"
          />
        </a-input-group>
      </a-form-item>
      <a-form-item
        label="团队名"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input-group
          style="display: inline-block; vertical-align: middle"
          :compact="true"
        >
          <a-input
            :style="{width: 'calc(100% - 100px)'}"
            v-decorator="['teamName', { initialValue:'', rules: [{required: true }]}]"
          />
        </a-input-group>
      </a-form-item>
      <a-form-item
        label="指导教师"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['teacher', { initialValue: '', rules: [{required: true }] }]"/>
      </a-form-item>
      <a-form-item
        label="教师教工号"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['teacherNumber', { initialValue: '', rules: [{required: true }] }]"/>
      </a-form-item>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
        <a-button type="primary" @click="submit()" :loading="loadingSubmit">开始报名</a-button>
        <team-info-drawer :data-source="dataSource"></team-info-drawer>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { teamRegistration } from '@/api/teamRegistration'
import TeamInfoDrawer from '../components/TeamInfoDrawer'
export default {
  components: {
    teamInfoDrawer: TeamInfoDrawer
  },
  props: {
    saveData: {
      type: Function,
      required: true
    },
    formData: {
      type: Object,
      required: true
    }
  },
  name: 'Step3',
  data () {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      loading: false,
      loadingSubmit: false,
      dataSource: {}
    }
  },
  methods: {
    submit () {
      this.loadingSubmit = true
      const teamRegistrationParam = {
        track: this.form.getFieldValue('track'),
        teamName: this.form.getFieldValue('teamName'),
        teacher: this.form.getFieldValue('teacher'),
        teacherNumber: this.form.getFieldValue('teacherNumber'),
        teamLeaderName: this.formData[1].teamLeaderName,
        teamLeaderUid: this.formData[1].uid,
        activityName: this.formData[1].activityName,
        teamMember: this.formData[2]
      }
      teamRegistration(teamRegistrationParam).then((res) => {
        if (res.data == null) {
          this.loadingSubmit = false
          this.$message.warn(res.msg)
        } else {
          setTimeout(() => {
            this.$message.success('恭喜报名成功o(*≧▽≦)ツ┏━┓')
            // 赋值新的变量值，例如设为 true
            this.loadingSubmit = false
          }, 3000)
          console.log(res.data)
          this.dataSource = res.data
        }
      })
      console.log(teamRegistrationParam)
    },
    finish () {
      this.$emit('finish')
    },
    prevStep () {
      this.saveData(2, this.msg)
      this.$emit('prevStep')
    }
  }
}
</script>
<style lang="less" scoped>
  .information {
    line-height: 22px;

    .ant-row:not(:last-child) {
      margin-bottom: 24px;
    }
  }
  .money {
    font-family: "Helvetica Neue",sans-serif;
    font-weight: 500;
    font-size: 20px;
    line-height: 14px;
  }
  .step-form-style-desc {
    padding: 0 56px;
    color: rgba(0, 0, 0, .45)
  }

</style>
