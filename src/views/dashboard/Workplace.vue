<template>
  <page-header-wrapper>
    <template v-slot:content>
      <div class="page-header-content">
        <div class="avatar">
          <a-avatar size="large" :src="currentUser.avatar" />
        </div>
        <div class="content">
          <div class="content-title">
            {{ timeFix }}，{{ user.name }}<span class="welcome-text">，{{ welcome }}</span>
          </div>
          <div style="color: #1890ff;">欢迎使用海南大学计算机科学与技术学院竞赛报名客户端 （づ￣3￣）づ╭❤～</div>
        </div>
      </div>
    </template>
    <template v-slot:extraContent>
      <div class="extra-content">
        <div class="stat-item">
          <a-statistic title="已参与竞赛" :value="number" />
        </div>
      </div>
    </template>

    <div>
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            class="project-list"
            :loading="loading"
            style="margin-bottom: 24px;"
            :bordered="false"
            title="我的竞赛"
            :body-style="{ padding: 0 }"
          >
            <router-link :to="'/list/card'" slot="extra">全部竞赛o(*≧▽≦)ツ┏━┓</router-link>
            <div>
              <a-skeleton id="radar" style="display: none"/>
              <a-card-grid class="project-card-grid" :key="index" v-for="(item, index) in projects" >
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <a-card-meta v-if="loading1">
                    <div slot="title" class="card-title">
                      <a-avatar size="big" :src="item.img"/>
                      <a>{{ item.name }}</a>
                    </div>
                    <p>结束时间</p>
                    <div slot="description" class="card-description">
                      {{ item.endTime }}
                    </div>
                  </a-card-meta>
                  <div class="project-item">
                    <ActivityDrawer :data-source="item"></ActivityDrawer>
                  </div>
                </a-card>
              </a-card-grid>
            </div>
          </a-card>

          <a-card title="学院公告 ( =•ω•= )m" :bordered="false">
            <a-list>
              <a-list-item v-for="msg in dataSource" :key="msg.id" v-if="dataSource.length>0">
                <P v-html="msg.log" ></P>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
        <a-col
          style="padding: 0 12px"
          :xl="8"
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24">
          <a-card
            title="快速开始 / 便捷导航"
            style="margin-bottom: 24px"
            :bordered="false"
            :body-style="{ padding: 0 }"
          >
            <div class="item-group">
              <router-link to="/account/settings/basic" style="color: #00A0E9">基本信息</router-link>
              <router-link to="/list/card" style="color: #00A0E9">竞赛列表</router-link>
              <router-link to="/account/center" style="color: #00A0E9">个人中心</router-link>
              <a-button size="small" type="primary" ghost icon="plus" @click="addMethod">提示</a-button>
            </div>
          </a-card>
          <a-card
            title="(入围国家级)优秀项目作品展示"
            style="margin-bottom: 24px"
            :bordered="false"
            :body-style="{ padding: 0 }"
          >
            <div style="min-height: 400px; display: flex">
              <!-- :scale="scale" :axis1Opts="axis1Opts" :axis2Opts="axis2Opts"  -->
              <GoodCard :project="good">
              </GoodCard>
            </div>
          </a-card>
          <!--          <a-card :loading="loading" title="(国家级)优秀项目作品展示" :bordered="false">
            <div class="members">
              <a-row>
                <a-col :span="12" v-for="(item, index) in teams" :key="index">
                  <a>
                    <a-avatar size="small" :src="item.avatar" />
                    <span class="member">{{ item.name }}</span>
                  </a>
                </a-col>
              </a-row>
            </div>
          </a-card>  -->
        </a-col>
      </a-row>
    </div>
  </page-header-wrapper>
</template>

<script>
import { timeFix } from '@/utils/util'
import { mapState } from 'vuex'
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import { Radar } from '@/components'
import { getLog } from '@/api/log'
import { getTeamsByName } from '@/api/teamRegistration'
import ActivityDrawer from '../dashboard/components/drawer'
import GoodCard from '../dashboard/components/goodCard'
import { getGoodProject } from '@/api/project'

export default {
  name: 'Workplace',
  components: {
    PageHeaderWrapper,
    Radar,
    ActivityDrawer: ActivityDrawer,
    GoodCard: GoodCard
  },
  data () {
    return {
      number: '',
      timeFix: timeFix(),
      avatar: '',
      user: {},
      dataSource: [],
      loading1: false,
      good: '',

      projects: [],
      loading: false,
      radarLoading: true,
      activities: [],
      teams: [],

      // data
      axis1Opts: {
        dataKey: 'item',
        line: null,
        tickLine: null,
        grid: {
          lineStyle: {
            lineDash: null
          },
          hideFirstLine: false
        }
      },
      axis2Opts: {
        dataKey: 'score',
        line: null,
        tickLine: null,
        grid: {
          type: 'polygon',
          lineStyle: {
            lineDash: null
          }
        }
      },
      scale: [
        {
          dataKey: 'score',
          min: 0,
          max: 80
        }
      ],
      axisData: [
        { item: '引用', a: 70, b: 30, c: 40 },
        { item: '口碑', a: 60, b: 70, c: 40 },
        { item: '产量', a: 50, b: 60, c: 40 },
        { item: '贡献', a: 40, b: 50, c: 40 },
        { item: '热度', a: 60, b: 70, c: 40 },
        { item: '引用', a: 70, b: 50, c: 40 }
      ],
      radarData: []
    }
  },
  computed: {
    ...mapState({
      nickname: state => state.user.nickname,
      welcome: state => state.user.welcome,
      avatar: state => state.user.avatar.avatar
    }),
    currentUser () {
      return {
        name: this.nickname,
        avatar: this.$store.getters.avatar.avatar
      }
    },
    userInfo () {
      console.log('userInfo', this.$store.getters.userInfo)
      console.log('userInfo', this.$store.getters.userInfo)
      console.log(JSON.stringify(this.$store.getters.activity))
      console.log(this.$store.getters.avatar.avatar)
      return this.$store.getters.userInfo
    }
  },
  created () {
    this.user = this.userInfo
    this.avatar = this.userInfo.avatar
  },
  mounted () {
    this.getLog()
      const user = {
        user: this.user.name
      }
    getTeamsByName(user).then((res) => {
      if (res.data == null) {
        document.getElementById('radar').style.display = ''
      }
        this.projects = res.data
        this.number = res.data.length
        console.log(this.projects)
        this.loading1 = true
        this.loading = false
      })
    getGoodProject().then((res) => {
      this.good = res.data
    })
  },
  methods: {
    addMethod () {
      this.$message.success('基本信息一定要填完整 o(￣ヘ￣o＃)')
    },
    getLog () {
      getLog().then((res) => {
        this.dataSource = res.data
      })
    }
    /* getActivity () {
      this.$http.get('/workplace/activity').then(res => {
        this.activities = res.result
      })
    },
    getTeams () {
      this.$http.get('/workplace/teams').then(res => {
        this.teams = res.result
      })
    }, */
  }
}
</script>

<style lang="less" scoped>
@import './Workplace.less';

.project-list {
  .card-title {
    font-size: 0;

    a {
      color: rgba(0, 0, 0, 0.85);
      margin-left: 12px;
      line-height: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: top;
      font-size: 14px;

      &:hover {
        color: #1890ff;
      }
    }
  }

  .card-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }

  .project-item {
    display: flex;
    margin-top: 8px;
    overflow: hidden;
    font-size: 12px;
    height: 20px;
    line-height: 20px;

    a {
      color: rgba(0, 0, 0, 0.45);
      display: inline-block;
      flex: 1 1 0;

      &:hover {
        color: #1890ff;
      }
    }

    .datetime {
      color: rgba(0, 0, 0, 0.25);
      flex: 0 0 auto;
      float: right;
    }
  }

  .ant-card-meta-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
}

.item-group {
  padding: 20px 0 8px 24px;
  font-size: 0;

  a {
    color: rgba(0, 0, 0, 0.65);
    display: inline-block;
    font-size: 14px;
    margin-bottom: 13px;
    width: 25%;
  }
}

.members {
  a {
    display: block;
    margin: 12px 0;
    line-height: 24px;
    height: 24px;

    .member {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 24px;
      max-width: 100px;
      vertical-align: top;
      margin-left: 12px;
      transition: all 0.3s;
      display: inline-block;
    }

    &:hover {
      span {
        color: #1890ff;
      }
    }
  }
}

.mobile {
  .project-list {
    .project-card-grid {
      width: 100%;
    }
  }

  .more-info {
    border: 0;
    padding-top: 16px;
    margin: 16px 0 16px;
  }

  .headerContent .title .welcome-text {
    display: none;
  }
}
</style>
