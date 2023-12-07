<template>
  <page-header-wrapper
    :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    :tab-change="(key) => {
      this.tabActiveKey = key
      this.onChange(page)
    }"
    content="找到你感兴趣的竞赛，点击报名，开始学习吧 (๑•̀ㅂ•́)و✧"
  >
    <a-select v-if="loading" style="width:100%" @focus="handleChange()" class="select">
      <a-select-option v-for="(name, index) in activityNames" :key="index" @click="selectByName(name)">
        {{ name }}
      </a-select-option>
    </a-select>
    <template v-slot:extraContent>
      <div style="width: 155px; margin-top: -20px;"><img style="width: 100%" :src="extraImage" /></div>
    </template>
    <a-list
      rowKey="id"
      :grid="{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}"
      :dataSource="dataSource"
      class="card-list"
    >
      <a-list-item
        slot="renderItem"
        slot-scope="item">
        <template>
          <a-card :hoverable="true">
            <a-card-meta v-if="loading" class="card">
              <a slot="title">{{ item.title }}</a>
              <a-avatar class="card-avatar" slot="avatar" :src="item.avatar" size="large"/>
              <div class="meta-content" slot="description" style="color: dodgerblue">{{ item.status }}</div>
            </a-card-meta>
            <template class="ant-card-actions" slot="actions">
              <a-drawer :data-source="item">详情</a-drawer>
              <router-link :to="'/form/step-form'" class="team" v-if="item.type==='团队'"><a @click="EnlistTeam(item.title, item.status)" >队长报名</a></router-link>
              <router-link :to="'/form/basic-form'" class="team" v-if="item.type==='个人'"><a @click="EnlistTeam(item.title, item.status)">个人报名</a></router-link>
            </template>
          </a-card>
        </template>
      </a-list-item>
    </a-list>
    <a-pagination
      show-quick-jumper
      :total="100"
      :current="pagination.current"
      defaultPageSize="9"
      @change="onChange"
      class="pagination"></a-pagination>
  </page-header-wrapper>
</template>

<script>
import { selectActivityByName, selectActivityByType, selectAllActivityName } from '@/api/activity'
import { Pagination } from 'ant-design-vue'
import Drawer from '@/views/list/components/drawer'
import { mapActions } from 'vuex'
/* dataSource.push({})
for (let i = 0; i < 12; i++) {
  dataSource.push({
    id: i,
    title: 'Alipay',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    content: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。'
  })
} */
export default {
  name: 'CardList',
  components: {
    'a-pagination': Pagination,
   'a-drawer': Drawer
  },
  data () {
    return {
      activityNames: '',
      tabList: [
        { key: '团队', tab: '团队竞赛' },
        { key: '个人', tab: '个人竞赛' },
        { key: '其他', tab: '其他竞赛' }
      ],
      tabActiveKey: '团队',
      extraImage: 'https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png',
      dataSource: '',
      loading: false,
      pagination: {
        current: 1,
        pageSize: 9
      }
    }
  },

  mounted () {
    this.onChange(1)
  },
  methods: {
    ...mapActions(['Enlist']),
    EnlistTeam (title, status) {
      if (status === '报名已结束') {
        this.$message.warn('报名已结束w(ﾟДﾟ)w')
        this.$message.warn('报名已结束w(ﾟДﾟ)w')
        this.$message.warn('报名已结束w(ﾟДﾟ)w')
        event.preventDefault()
      }
      const activity = {
        activity: title
      }
      this.$store.dispatch('Enlist', activity).then(() => {
        console.log(JSON.stringify(this.$store.getters.activity))
      })
    },
    onChange (page) {
      this.pagination.current = page
      const parameter = {
        pageNum: page,
        pageSize: 9,
        type: this.tabActiveKey
      }
      selectActivityByType(parameter).then(res => {
        this.dataSource = res.data
        console.log(res.data)
        this.loading = true
      })
    },
    handleChange () {
      selectAllActivityName().then((res) => {
        this.activityNames = res.data
        this.loading = true
      })
    },
    selectByName (activityName) {
      this.$message.success(activityName)
      const name = {
        name: activityName
      }
      selectActivityByName(name).then((res) => {
        this.dataSource = res.data
        this.loading = true
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import "~@/components/index.less";
  .card-list {
    :deep(.ant-card-body:hover) {
      .ant-card-meta-title>a {
        color: @primary-color;
      }
    }

    :deep(.ant-card-meta-title) {
      margin-bottom: 12px;

      &>a {
        display: inline-block;
        max-width: 100%;
        color: rgba(0,0,0,.85);
      }
    }

    :deep(.meta-content) {
      position: relative;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      height: 64px;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;

      margin-bottom: 1em;
    }
  }

  .card-avatar {
    width: 100px;
    height: 100px;
    border-radius: 48px;
  }
  .ant-card-actions {
    background: #f7f9fa;

    li {
      float: left;
      text-align: center;
      margin: 12px 0;
      color: rgba(0, 0, 0, 0.45);
      width: 50%;

      &:not(:last-child) {
        border-right: 1px solid #e8e8e8;
      }

      a {
        color: rgba(0, 0, 0, .45);
        line-height: 22px;
        display: inline-block;
        width: 100%;
        &:hover {
          color: @primary-color;
        }
      }
    }
  }
  .new-btn {
    background-color: #fff;
    border-radius: 2px;
    width: 100%;
    height: 188px;
  }
  .pagination {
    text-align: right;
  }

</style>
