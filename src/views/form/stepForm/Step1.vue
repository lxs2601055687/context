<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item
        label="队长姓名"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input-group
          style="display: inline-block; vertical-align: middle"
          :compact="true"
        >
          <a-input
            :style="{width: 'calc(100% - 100px)'}"
            v-decorator="['teamLeaderName', { initialValue: name, rules: [{required: true }]}]"
          />
        </a-input-group>
      </a-form-item>
      <a-form-item
        label="队长学号"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['uid', { initialValue: uid, rules: [{required: true }] }]"/>
      </a-form-item>
      <a-form-item
        label="年级"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['grade', { initialValue: grade, rules: [{required: true }] }]"/>
      </a-form-item>
      <a-form-item
        label="学院"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['academy', { initialValue: academy, rules: [{required: true }] }]"/>
      </a-form-item>
      <a-form-item
        label="专业"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['specializedSubject', { initialValue: specializedSubject, rules: [{required: true }] }]"/>
      </a-form-item>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button type="primary" @click="nextStep">下一步</a-button>
      </a-form-item>
    </a-form>
    <a-divider />
    <div class="step-form-style-desc">
      <h3>说明: 每个人必须完善自己的个人信息才能正常完成报名操作 （づ￣3￣）づ╭❤～</h3>
      <h4>进入报名后 最好一次性填完所有信息</h4>
      <p>报名完成后，如果需要修改队员信息请到主页-我的竞赛-管理信息。</p>
      <h4>提示</h4>
      <p>一旦过了报名时间，队伍信息将不支持修改。</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    saveData: {
      type: Function,
      required: true
    }
  },
  name: 'Step1',
  data () {
    return {
      uid: this.$store.getters.userInfo.uid,
      name: this.$store.getters.userInfo.name,
      academy: this.$store.getters.userInfo.academy,
      grade: this.$store.getters.userInfo.grade,
      specializedSubject: this.$store.getters.userInfo.specializedSubject,
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this)
    }
  },
  methods: {
    nextStep () {
      const { form: { validateFields } } = this
      if (this.$store.getters.activity.activity == null) {
        this.$message.error('拜托去选一个竞赛在报名 不要在调戏我了')
      } else {
        const teamLeader = {
          activityName: this.$store.getters.activity.activity,
          uid: this.form.getFieldValue('uid'),
          teamLeaderName: this.form.getFieldValue('teamLeaderName'),
          academy: this.form.getFieldValue('academy'),
          grade: this.form.getFieldValue('grade'),
          specializedSubject: this.form.getFieldValue('specializedSubject')
        }
        this.saveData(1, teamLeader)
        console.log(teamLeader)
        // 先校验，通过表单校验后，才进入下一步
        validateFields((err, values) => {
          if (!err) {
            this.$emit('nextStep')
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.step-form-style-desc {
  padding: 0 56px;
  color: rgba(0,0,0,.45);

  h3 {
    margin: 0 0 12px;
    color: rgba(0,0,0,.45);
    font-size: 16px;
    line-height: 32px;
  }

  h4 {
    margin: 0 0 4px;
    color: rgba(0,0,0,.45);
    font-size: 14px;
    line-height: 22px;
  }

  p {
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 22px;
  }
}
</style>
