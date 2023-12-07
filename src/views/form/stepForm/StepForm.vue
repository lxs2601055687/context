<template>
  <page-header-wrapper>
    <!-- PageHeader 第二种使用方式 (v-slot) -->
    <template v-slot:content>
      <div>
        <p>进入报名界面后=>请勿刷新页面这会导致数据丢失</p>
        <h1 v-if="activity.activity != null || activity.activity !== undefined" class="activity">竞赛名称：{{ activity.activity }}</h1>
        <h2 v-else style="color: #ff7e05">不选个竞赛就报名吗  (°ー°〃)</h2>
        <!-- 其他属性的显示 -->
        <router-link to="/list/card">点击返回竞赛列表</router-link>
      </div>
    </template>
    <a-card :bordered="false">
      <a-steps class="steps" :current="currentTab">
        <a-step title="队长信息填写" />
        <a-step title="队员信息填写" />
        <a-step title="赛道和团队名" />
      </a-steps>
      <div class="content">
        <step1 v-if="currentTab === 0" @nextStep="nextStep" :save-data="saveData"/>
        <step2 v-if="currentTab === 1" @nextStep="nextStep" @prevStep="prevStep" :save-data="saveData"/>
        <step3 v-if="currentTab === 2" @prevStep="prevStep" @finish="finish" :save-data="saveData" :form-data="formData"/>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
export default {
  name: 'StepForm',
  components: {
    Step1,
    Step2,
    Step3
  },
  data () {
    return {
      formData: {}, // 用于保存子组件传递过来的数据
      activity: { activity: '' },
      loading: false,
      currentTab: 0,
      // form
      form: null
    }
  },
  created () {
    this.activity = this.$store.getters.activity
    this.loading = true
  },
  mounted () {
    this.activity = this.$store.getters.activity
    this.loading = true
  },
  methods: {
    saveData (step, data) {
      this.$set(this.formData, step, data)
      console.log(this.formData)
    },
    // handler
    nextStep () {
      if (this.currentTab < 2) {
        this.currentTab += 1
      }
    },
    prevStep () {
      if (this.currentTab > 0) {
        this.currentTab -= 1
      }
    },
    finish () {
      this.currentTab = 0
    }
  }
}
</script>

<style lang="less" scoped>
  .steps {
    max-width: 750px;
    margin: 16px auto;
  }
  .activity {
    float: inside;
    color: #00A0E9;
    font-size: 200%;
  }
</style>
