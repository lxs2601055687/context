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
      <a-card title="学院公告" :bordered="false">
        <a-list>
          <a-list-item v-for="(msg, index) in dataSource" :key="index" >
          </a-list-item>
        </a-list>
      </a-card>
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

  name: 'TeamDrawer',
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
