<template>
  <div>
    <a @click="showDrawer">详情</a>
    <a-drawer
      title="信息如下"
      placement="top"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <h1 style="color: #1890ff">队伍信息：团队id：{{ teamId }}</h1>
      <p>团队名称：</p> <p>{{ teamName }}</p>
      <p>竞赛名称：</p> <p v-if="dataSource">{{ activityName }}</p>
      <p>赛道：</p> <p>{{ track }}</p>
      <P>指导教师:</P> <P>{{ teacher }}</P>
      <p>队长：</p> <p>{{ teamLeaderName }}</p>
      <a-list>
        <a-list-item v-for="(msg, index) in dataSource" :key="index" >
          <p>成员{{ index+1 }}：</p>
          <p>{{ msg.teamMemberName }}</p>
          <p>学号</p>
          <p>{{ msg.teamMemberId }}</p>
        </a-list-item>
      </a-list>
    </a-drawer>
  </div>
</template>
<script>
import { searchTeamById } from '@/api/teamRegistration'
export default {
  props: {
     teamId: {
       type: Number,
       default: 0
    }
  },

  name: 'TeamInfoDrawer',
  data () {
    return {
      dataSource: [],
      activityName: '',
      track: '',
      teacher: '',
      teamLeaderName: '',
      teamName: '',
      visible: false
    }
  },
  methods: {
    afterVisibleChange (val) {
      console.log('visible', val)
    },
    showDrawer () {
      const teamId = {
        teamId: this.teamId
      }
      searchTeamById(teamId).then((res) => {
        this.dataSource = res.data
       this.activityName = this.dataSource[0].activityName
        this.track = this.dataSource[0].track
        this.teamLeaderName = this.dataSource[0].teamLeaderName
        this.teacher = this.dataSource[0].teacher
        this.teamName = this.dataSource[0].teamName
      })
      this.visible = true
    },
    onClose () {
      this.visible = false
    }
  }
}
</script>
<style>
p {
  display: inline;
  margin-right: 10px;
}

</style>
