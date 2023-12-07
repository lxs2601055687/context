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
      <p>报名结束时间:</p>
      <p>{{ dataSource.endTime }}</p>
      <p>详情</p>
      <p>{{ dataSource.description }}</p>
      <P>竞赛官网</P>
      <P>{{ dataSource.website }}</P>
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

  name: 'Drawer',
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
