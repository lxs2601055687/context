<template>
  <!-- hidden PageHeaderWrapper title demo -->
  <page-header-wrapper :title="false">
    <template v-slot:content>
      <div>
        <p style="color: #1890ff; font-size: 20px">必须在个人设置里完善自己的个人信息才能参加报名</p><br>
        <p>进入报名界面后=>请勿刷新页面这会导致数据丢失</p>
        <h1 v-if="activity.activity != null || activity.activity !== undefined" class="activity">竞赛名称：{{ activity.activity }}</h1>
        <h2 v-else style="color: #ff7e05">不选个竞赛就报名吗 o(￣ヘ￣o＃)</h2>
        <router-link to="/list/card">点击返回竞赛列表</router-link>
        <!-- 其他属性的显示 -->
      </div>
    </template>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
        <a-form-item
          label="姓名"
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
              :disabled="true"
            />
          </a-input-group>
        </a-form-item>
        <a-form-item
          label="学号"
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
        </a-form-item>
        <a-button type="primary" :loading="loading" id="button" @click="handleSubmit">报名</a-button>
      </a-form>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { addIndividual } from '@/api/Individual'
export default {
  name: 'BaseForm',
  data () {
    return {
      loading: false,
      activity: { activity: '' },
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
  mounted () {
    this.activity = this.$store.getters.activity
  },
  methods: {
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (this.activity.activity == null) {
          this.$message.error('拜托先去选一个竞赛在点报名键OK ┗|｀O′|┛ 嗷~~')
        } else {
          if (!err) {
            this.loading = true
            const param = {
              uid: this.form.getFieldValue('uid'),
              grade: this.form.getFieldValue('grade'),
              specializedSubject: this.form.getFieldValue('specializedSubject'),
              academy: this.form.getFieldValue('academy'),
              name: this.form.getFieldValue('teamLeaderName'),
              activity: this.activity.activity
            }
            if (param.name == null) {
              this.$message.warn('基本信息不完善，无法获取姓名')
            }
            addIndividual(param).then((res) => {
              if (res.data === true) {
                this.$message.success('报名成功 到个人中心查看详细信息 (￣ε(#￣)☆╰╮o(￣皿￣///)', 10)
                setTimeout(() => {
                  // 赋值新的变量值，例如设为 true
                  this.loading = false
                }, 3000)
              } else {
                this.$message.error('你已重复报名，不要再点了杰哥(#`O′)')
                setTimeout(() => {
                  // 赋值新的变量值，例如设为 true
                  this.loading = false
                }, 3000)
              }
            })
            console.log('Received values of form: ', values)
          }
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
#button {
  /* 定位方式需要设置为相对定位，否则 transform 不生效 */
  position: relative;
  /* 初始位置为左侧 0px */
  left: 0;
  /* 进行平移变换 */
  transform: translateX(225px);
}
.activity {
  float: inside;
  color: #00A0E9;
  font-size: 200%;
}
</style>
