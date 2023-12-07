<template>
  <div>
    <a-button type="dashed" @click="showDrawer">查看报名情况</a-button>
    <a-drawer
      title="Basic Drawer"
      placement="top"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <h1 style="color: #00A0E9">报名信息：</h1>
      <p>团队名称：</p> <p>{{ dataSource[0].teamName }}</p>
      <p>竞赛名称：</p> <p>{{ dataSource[0].activityName }}</p>
      <p>赛道 </p> <p>{{ dataSource[0].track }}</p>
      <P>指导教师:</P> <P>{{ dataSource[0].teacher }}</P>
      <p>队长：</p> <p>{{ dataSource[0].teamLeaderName }}</p>
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
export default {
  props: {
    dataSource: {
      type: [Array, Object],
      default: () => []
    }
  },

  name: 'TeamInfoDrawer',
  data () {
    return {
      visible: false
    }
  },
  methods: {
    afterVisibleChange (val) {
      console.log('visible', val)
    },
    showDrawer () {
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
