<template>
  <div class="info">
    <div class="left" id="userinfo_left">
      <el-menu class="el-menu-vertical-demo" :default-active="$route.path">
        <el-menu-item index="/navigator/userinfo/accountInfo">
          <i class="icon-user-check"></i>用户信息
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right" id="userinfo">
      <router-view class='info__view' @initScroll="init_scroll" @destroyScroll="destroy_scroll"></router-view>
    </div>
  </div>
</template>
<script>
import Scrollbar from 'smooth-scrollbar';

export default {
  methods: {
    init_scroll() {
      Scrollbar.init(document.getElementById('userinfo'), {
        alwaysShowTracks: true,
      });
      Scrollbar.init(document.getElementById('userinfo_left'));
    },
    destroy_scroll() {
      Scrollbar.destroyAll(); // 路由更新销毁所有Scrollbar
    },
  },
  mounted() {
    this.init_scroll();
  },
  beforeUpdate() {
    this.destroy_scroll();
  },
  updated() {
    if (this.$route.path.indexOf('userinfo') === -1) {
      return;
    }
    // 如果路由切到非userinfo模块，此时settings组件已销毁，如果执行destroyAll将会报错，故return
    this.$nextTick(() => {
      this.init_scroll(); // 更新完路由重新初始化路由更新销毁所有Scrollbar
    });
  },
};
</script>
<style lang="scss" scoped>
@import "~@scss";
  .info{
    display: flex;
    height: 100%;
    .left{
      flex: 0 0 160px;
      width: 160px;
      height: 100%;
      .el-menu-vertical-demo{
        height: 100%;
        .el-menu-item{
          i{
            @include icon_size;
          }
        }
      }
    }
    .right{
      flex: 1 1 auto;
      min-width: 400px;
      height: 100%;
    }
  }
</style>
