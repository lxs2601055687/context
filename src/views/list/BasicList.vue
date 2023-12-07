<template>
  <page-header-wrapper>
    <a-card
      style="margin-top: 24px"
      :bordered="false"
      title="活动列表">

      <div slot="extra">
        <a-radio-group v-model="status">
          <a-radio-button value="all" @click="selectActivityByStatus()">正在进行的活动</a-radio-button>
          <a-radio-button value="processing" @click="selectActivityByStatusOne()">已结束的活动</a-radio-button>
        </a-radio-group>
        <a-select v-if="loading" style="width: 250px" @focus="handleChange()">
          <a-select-option v-for="(name, index) in activityNames" :key="index" @click="selectByName(name)">
            {{ name }}
          </a-select-option>
        </a-select>
      </div>

      <div class="operate">
        <a-button type="dashed" style="width: 100%" icon="plus" @click="add">添加</a-button>
      </div>
      <a-list size="large" >
        <a-list-item v-for="(item,index) in msg" :key="index" v-if="loading">
          <a-list-item-meta :description="item.description" v-if="msg.length>0">
            <a-avatar slot="avatar" size="large" shape="square" :src="item.avatar"/>
            <a slot="title">{{ item.title }}</a>
          </a-list-item-meta>
          <div slot="actions">
            <a @click="edit(item)">更改</a>
          </div>
          <div slot="actions">
            <a-popconfirm
              title="Are you sure delete this task?"
              ok-text="确认"
              cancel-text="取消"
              @confirm="confirm(item.activityId)"
              @cancel="cancel()"
            >
              <a href="#">删除</a>
            </a-popconfirm>
          </div>
          <div class="list-content">
            <div class="list-content-item">
              <span>发布人</span>
              <p>{{ item.owner }}</p>
            </div>
            <div class="list-content-item">
              <span>官网</span>
              <p>https://{{ item.website }}.cn</p>
            </div>
            <div class="list-content-item">
              <span>开始时间</span>
              <p>{{ item.startAt }}</p>
            </div>
            <div class="list-content-item">
              <span>结束时间</span>
              <p>{{ item.endAt }}</p>
            </div>
            <div class="list-content-item">
              <span>状态</span>
              <a-tag color="blue">{{ item.status }}</a-tag>
            </div>
          </div>
        </a-list-item>
      </a-list>
      <a-pagination
        show-quick-jumper
        :total="100"
        :current="current"
        defaultPageSize="5"
        @change="onChange"
        class="pagination"></a-pagination>
    </a-card>
  </page-header-wrapper>
</template>
<script>
// 演示如何使用 this.$dialog 封装 modal 组件
import TaskForm from './modules/TaskForm'
import Info from './components/Info'
import { selectActivity, deleteActivity, selectAllActivityName, selectActivityByName, selectActivityByStatus } from '@/api/activity'
import { Pagination } from 'ant-design-vue'
const parameter = {
  pageNum: 1,
  pageSize: 5
}
export default {
  name: 'StandardList',
  components: {
    TaskForm,
    Info,
    'a-pagination': Pagination
  },
  data () {
    return {
      msg: '',
      activityNames: '',
      loading: false,
      current: 1,
      searchValue: ''
    }
  },
  created () {
      selectActivity(parameter).then(res => {
        console.log(res.data)
        this.msg = res.data
        this.loading = true
        console.log(res.data)
      })
  },
  methods: {
    selectActivityByStatusOne () {
      const status = {
        status: 1
      }
      selectActivityByStatus(status).then((res) => {
        this.msg = res.data
        this.loading = true
      })
    },
    selectActivityByStatus () {
      const status = {
        status: 0
      }
      selectActivityByStatus(status).then((res) => {
        this.msg = res.data
        this.loading = true
      })
    },
    selectByName (activityName) {
      this.$message.success(activityName)
      const name = {
        name: activityName
      }
      selectActivityByName(name).then((res) => {
        this.msg = res.data
        this.loading = true
      })
    },
    handleChange () {
     selectAllActivityName().then((res) => {
         this.activityNames = res.data
         this.loading = true
     })
    },
     onChange (page) {
       this.current = page
      const parameter = {
        pageNum: page,
        pageSize: 5
      }
      selectActivity(parameter).then(res => {
        this.msg = res.data
        this.loading = true
        console.log('msg', this.msg)
      })
    },
    confirm (activityId) {
       const activityDeleteParams = {
         activityId: activityId
       }
        console.log('activityId', activityId)
        deleteActivity(activityDeleteParams).then(res => {
        this.$message.success(res.data)
        this.onChange(this.currentPage)
      })
    },
    add () {
      this.$dialog(TaskForm,
        // component props
        {
          record: {},
          on: {
            ok: () => {
              this.onChange(this.current)
              console.log('modal ok 回调')
            },
            cancel: () => {
              console.log('modal cancel 回调')
              this.onChange(this.current)
            },
            close: () => {
              console.log('modal close 回调')
              this.onChange(this.current)
            }
          }
        },
        // modal props
        {
          title: '新增活动',
          width: 700,
          centered: true,
          maskClosable: false
        })
    },
    edit (record) {
      console.log('record', record)
      this.$dialog(TaskForm,
        // component props
        {
          record,
          on: {
            ok: () => {
              console.log('ok 回调')
              this.onChange(this.current)
            },
            cancel: () => {
              console.log('cancel 回调')
              this.onChange(this.current)
            },
            close: () => {
              console.log('modal close 回调')
              this.onChange(this.current)
            }
          }
        },
        // modal props
        {
          title: '更新操作',
          width: 700,
          centered: true,
          maskClosable: false
        })
    }
  }
}

</script>
<style lang="less" scoped>
.ant-avatar-lg {
    width: 48px;
    height: 48px;
    line-height: 48px;
}
.pagination {
  text-align: right;
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
