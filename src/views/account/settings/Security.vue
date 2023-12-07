<template>
  <a-list
    itemLayout="horizontal"
    :dataSource="data"
  >
    <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
      <a-list-item-meta>
        <a slot="title">{{ item.title }}</a>
        <span slot="description">
          <span class="security-list-description">{{ item.description }}</span>
          <span v-if="item.value"> : </span>
          <span class="security-list-value">{{ item.value }}</span>
        </span>
      </a-list-item-meta>
      <template v-if="item.actions.title==='修改手机号'">
        <PhoneUpdateDrawer></PhoneUpdateDrawer>
      </template>
      <template v-if="item.actions.title==='修改密码'">
        <password-update-drawer></password-update-drawer>
      </template>
    </a-list-item>
  </a-list>
</template>

<script>
import phoneUpdateDrawer from '../settings/PhoneUpdateDrawer'
import passwordUpdateDrawer from '../settings/PasswordUpdateDrawer'
export default {
  components: {
    PhoneUpdateDrawer: phoneUpdateDrawer,
    passwordUpdateDrawer: passwordUpdateDrawer
  },
computed: {
    data () {
        return [
        { title: this.$t('account.settings.security.password'), description: this.$t('account.settings.security.password-description'), value: '强', actions: { title: '修改密码', callback: () => { document.getElementById('phone').style.visibility = 'visible' } } },
        { title: this.$t('account.settings.security.phone'), description: this.$t('account.settings.security.phone-description'), value: this.$store.getters.userInfo.phone, actions: { title: '修改手机号', callback: () => { this.$message.success('This is a message of success') } } }
      ]
    }
  }
}
</script>

<style scoped>

</style>
