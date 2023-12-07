<template>
  <div class="app-list">
    <a-list
      :grid="{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }"
    >
      <a-list-item v-for="(item, index) in dataSource" :key="index" v-if="loading">
        <a-card :hoverable="true">
          <a-card-meta>
            <div style="margin-bottom: 3px" slot="title">{{ item.activityName }}</div>
            <a-avatar class="card-avatar" slot="avatar" :src="arr[index]" size="large"/>
            <div class="meta-cardInfo" slot="description">
              <div>
                <p>
                  <span style="color: #00A0E9" slot="description">{{ item.name }}</span>
                </p>
              </div>
              <div>
                <p>学号：</p>
                <span>{{ item.uid }}</span>
              </div>
            </div>
          </a-card-meta>
          <template class="ant-card-actions" slot="actions">
            <a>
              <a-dropdown>
                <a class="ant-dropdown-link" href="javascript:;">
                  材料提交
                </a>
                <a-menu slot="overlay">
                  <a-menu-item>
                    <a href="javascript:;" @click="award">提交获奖材料</a>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </a>
          </template>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import moment from 'moment'
import { TagSelect, StandardFormRow, Ellipsis, AvatarList } from '@/components'
const TagSelectOption = TagSelect.Option
const AvatarListItem = AvatarList.Item

export default {
  name: 'Project',
  components: {
    AvatarList,
    AvatarListItem,
    Ellipsis,
    TagSelect,
    TagSelectOption,
    StandardFormRow
  },
  data () {
    return {
      form: this.$form.createForm(this),
      dataSource: '',
      loading: false,
      arr: ['https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F38988f70-7be1-4a0f-8944-f221fa9903a2%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1685005124&t=edb162af94d046c20ab8df65fbd1915e', 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F52b5d383-36ab-4a19-8937-6fb6c175d459%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1685005124&t=4873d1c212419e6febd811b654fa78f9', 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F6bb428b3-f089-49e4-a42d-9daab7e4ab95%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1685005124&t=702997d423dfcc4ad299dfd8bc47be67', 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fc368ce06-a2a4-4c4b-a9eb-a1e39f40dfbc%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1685005124&t=c8a34432de3865fd05fdfe761d740711', 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F0d311384-90d2-47ee-910a-1afef430288d%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1685005124&t=fde8e05d2c169cf2a200ab1a474716b8', 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fca9429fd-6e05-41bf-97a6-1b900f727158%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1685005124&t=bb7f1ef313470cd0b9f8f4944bad2d7b', 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F899b1237-dfff-4e4c-a744-c0c1e33c0578%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1685005124&t=ca09d6790304e66a2c228472d2ed7c9d']

    }
  },
  filters: {
    fromNow (date) {
      return moment(date).fromNow()
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    award () {
      this.$message.warn('暂不支持')
    },
    avatar () {
      const arr = ['https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F38988f70-7be1-4a0f-8944-f221fa9903a2%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1685005124&t=edb162af94d046c20ab8df65fbd1915e', 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F52b5d383-36ab-4a19-8937-6fb6c175d459%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1685005124&t=4873d1c212419e6febd811b654fa78f9', 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F6bb428b3-f089-49e4-a42d-9daab7e4ab95%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1685005124&t=702997d423dfcc4ad299dfd8bc47be67', 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fc368ce06-a2a4-4c4b-a9eb-a1e39f40dfbc%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1685005124&t=c8a34432de3865fd05fdfe761d740711', 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F0d311384-90d2-47ee-910a-1afef430288d%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1685005124&t=fde8e05d2c169cf2a200ab1a474716b8', 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fca9429fd-6e05-41bf-97a6-1b900f727158%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1685005124&t=bb7f1ef313470cd0b9f8f4944bad2d7b', 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F899b1237-dfff-4e4c-a744-c0c1e33c0578%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1685005124&t=ca09d6790304e66a2c228472d2ed7c9d']
      return Math.floor(Math.random() * arr.length)
    },
    handleChange (value) {
      console.log(`selected ${value}`)
    },
    getList () {
      this.$http.get('/activity/alone', { params: { uid: this.$store.getters.userInfo.uid } }).then(res => {
        console.log('res', res)
        this.dataSource = res.data
        this.loading = true
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .ant-pro-pages-account-projects-cardList {
    margin-top: 24px;

    :deep(.ant-card-meta-title) {
      margin-bottom: 4px;
    }

    :deep(.ant-card-meta-description) {
      height: 44px;
      overflow: hidden;
      line-height: 22px;
    }

    .cardItemContent {
      display: flex;
      height: 20px;
      margin-top: 16px;
      margin-bottom: -4px;
      line-height: 20px;

      > span {
        flex: 1 1;
        color: rgba(0,0,0,.45);
        font-size: 12px;
      }

      :deep(.ant-pro-avatar-list) {
        flex: 0 1 auto;
      }
    }
  }
</style>
