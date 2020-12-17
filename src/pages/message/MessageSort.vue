<template>
  <div class="meaasge_componnent">
      <div class="left">
            <el-menu class="el-menu-vertical-demo" :default-active="$route.path" router>
                <el-menu-item index="/navigator/message/unreadMessage">
                    <i class="el-icon-message"></i><span>未读消息</span>
                    <el-badge :value="unReadMessage.length" :max="99" class="item" v-show="unReadMessage.length > 0"></el-badge>
                </el-menu-item>
                <el-menu-item index="/navigator/message/allMessage">
                    <i class="el-icon-more"></i><span>全部消息</span>
                    <el-badge :value="message.length" :max="99" class="item" v-show="message.length > 0"></el-badge>
                </el-menu-item>
                <el-menu-item index="/navigator/message/importMessage">
                    <i class="el-icon-star-on"></i><span>星标消息</span>
                    <el-badge :value="importMessage.length" :max="99" class="item" v-show="importMessage.length > 0"></el-badge>
                </el-menu-item>
            </el-menu>
      </div>
      <div class="right">
          <div class="button-group">
              <el-button @click="readAll">全部置为已读</el-button>
              <el-button @click="clearAll">清空所有消息</el-button>
          </div>
          <div class="line"><p></p></div>
          <router-view class="view" :msg = 'message'></router-view>
      </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      message: [
        { id: 1, title: 'NBA', value: '圣诞大战 ', time: '2017-11-10', status: '未读', important: true },
        { id: 2, title: '深圳', value: '又双叒叕入冬失败', time: '2017-11-10', status: '已读', important: true },
        { id: 3, title: '科技', value: 'iphone X 你入手了吗？', time: '2017-11-10', status: '已读', important: false },
        { id: 4, title: '上班', value: '被生活强暴', time: '2017-11-10', status: '未读', important: true },
        { id: 5, title: '假期', value: '听过的人很多，见过的人很少', time: '2017-11-10', status: '未读', important: false },
        { id: 5, title: '假期', value: '听过的人很多，见过的人很少', time: '2017-11-10', status: '未读', important: false },
        { id: 1, title: 'NBA', value: '圣诞大战 ', time: '2017-11-10', status: '未读', important: false },
        { id: 2, title: '深圳', value: '又双叒叕入冬失败', time: '2017-11-10', status: '已读', important: true },
        { id: 3, title: '科技', value: 'iphone X 你入手了吗？', time: '2017-11-10', status: '已读', important: false },
        { id: 4, title: '上班', value: '被生活强暴', time: '2017-11-10', status: '未读', important: false },
        { id: 5, title: '假期', value: '听过的人很多，见过的人很少', time: '2017-11-10', status: '未读', important: false },
        { id: 5, title: '假期', value: '听过的人很多，见过的人很少', time: '2017-11-10', status: '未读', important: false },
        { id: 1, title: 'NBA', value: '圣诞大战 ', time: '2017-11-10', status: '未读', important: true },
        { id: 2, title: '深圳', value: '又双叒叕入冬失败', time: '2017-11-10', status: '已读', important: false },
        { id: 3, title: '科技', value: 'iphone X 你入手了吗？', time: '2017-11-10', status: '已读', important: false },
        { id: 4, title: '上班', value: '被生活强暴', time: '2017-11-10', status: '未读', important: false },
        { id: 5, title: '假期', value: '听过的人很多，见过的人很少', time: '2017-11-10', status: '未读', important: false },
        { id: 5, title: '假期', value: '听过的人很多，见过的人很少', time: '2017-11-10', status: '未读', important: true },
      ],
    };
  },
  methods: {
    readAll() {
      this.message.forEach((element) => {
        element.status = '已读';
      });
    },
    clearAll() {
      this.message = [];
    },
  },
  computed: {
    unReadMessage() {
      return this.message.filter(el => el.status === '未读');
    },
    importMessage() {
      return this.message.filter(el => el.important);
    },
  },
};
</script>
<style lang="scss" scoped>
    .meaasge_componnent{
        .left{
            flex: 0 0 160px;
            width: 160px;
            .el-menu-vertical-demo{
                height: 100%;
            }
        }
        .right{
            flex: 1 1 auto;
            display: flex;
            flex-direction: column;
            overflow-x: auto;
            .button-group{
                flex: 0 0 50px;
                height: 50px;
                min-width: 400px;
                padding: 10px 60px;
            }
            .line{
                padding: 0 60px;
                min-width: 400px;
                p{
                    border-bottom: 1px solid #ccc;
                }
            }
            .view{
                padding: 10px 60px;
                min-width: 400px;
                flex: 1 1 auto;
            }
        }
    }
</style>
