<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <a-alert
        :closable="true"
        message="队员必须正确使用学号注册该系统 使用对应邀请码来绑定队员信息。"
        style="margin-bottom: 24px;"
      />
      <a-list size="small">
        <a-list-item v-for="(item,index) in msg" :key="index" v-if="loading1">
          <a-list-item-meta :description="item.description" v-if="msg.length>0">
            <a slot="title">{{ item.name }}</a>
          </a-list-item-meta>
          <div slot="actions">
            <a-popconfirm
              title="Are you sure delete this task?"
              ok-text="确认"
              cancel-text="取消"
              @confirm="confirm(index)"
              @cancel="cancel()"
            >
              <a href="#">删除</a>
            </a-popconfirm>
          </div>
          <div class="list-content">
            <div class="list-content-item">
              <span>队员学号</span>
              <p>{{ item.uid }}</p>
            </div>
            <div class="list-content-item">
              <span>队员年级</span>
              <p>{{ item.grade }}</p>
            </div>
            <div class="list-content-item">
              <span>队员学院</span>
              <p>{{ item.academy }}</p>
            </div>
          </div>
        </a-list-item>
      </a-list>
      <a-divider />
      <a-form-item
        label="队员邀请码"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-input
          style="width: 80%;"
          v-decorator="['invitation', { initialValue: '', rules: [{required: false, message: '请输入队员邀请码'}] }]" />
        <a-button type="primary" :loading="addloading" @click="selectByInvitation()">添加</a-button>
      </a-form-item>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
        <a-button :loading="loading" type="primary" @click="nextStep">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { SelectByInvitation } from '@/api/student'
export default {
  props: {
    saveData: {
      type: Function,
      required: true
    }
  },
  name: 'Step2',
  data () {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      loading: false,
      addloading: false,
      loading1: false,
      timer: 0,
      msg: []
    }
  },
  methods: {
    confirm (index) {
      this.msg.splice(index, 1)
    },
    selectByInvitation () {
      const invitation = {
          invitation: this.form.getFieldValue('invitation')
        }
        if (this.form.getFieldValue('invitation') === undefined) {
          this.$message.warn('请确认邀请码被正确输入')
        } else {
          SelectByInvitation(invitation).then((res) => {
            if (res.data == null) {
              this.$message.warn('该队员不存在,请确认邀请码被正确输入')
              this.loading1 = true
            } else {
              this.msg.push(res.data)
              this.loading1 = true
            }
          })
        }
    },
    nextStep () {
      const that = this
      this.saveData(2, this.msg)
      const { form: { validateFields } } = this
      that.loading = true
      validateFields((err, values) => {
        if (!err) {
          console.log('表单 values', values)
          that.timer = setTimeout(function () {
            that.loading = false
            that.$emit('nextStep')
          }, 1500)
        } else {
          that.loading = false
        }
      })
    },
    prevStep () {
      this.$emit('prevStep')
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="less" scoped>
  .stepFormText {
    margin-bottom: 24px;

    .ant-form-item-label,
    .ant-form-item-control {
      line-height: 22px;
    }
  }
  .list-content-item {
    color: rgba(0, 0, 0, .45);
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    margin-left: 40px;
    span {
      line-height: 20px;
    }
    p {
      margin-top: 4px;
      margin-bottom: 0;
      line-height: 22px;
    }
  }
</style>
