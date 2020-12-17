<template>
  <div class="customers">
     <div class="left" id="customer_left">
      <el-menu class="el-menu-vertical-demo" router :default-active="$route.path" :default-openeds='["1"]'>
        <el-menu-item index="/navigator/customers/customersList">
          <i class="el-icon-tickets"></i><span>客户档案</span>
        </el-menu-item>

        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>随访</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/navigator/customers/newfollow">新建随访</el-menu-item>
              <el-menu-item index="/navigator/customers/waitingfollow">待随访</el-menu-item>
              <el-menu-item index="/navigator/customers/alreadyfollow">已随访</el-menu-item>
              <el-menu-item index="/navigator/customers/cancelfollow">取消随访</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="right" id="customer">
      <router-view class='info__view' @destroyScroll="destroy_scroll" @initScroll="init_scroll"></router-view>
    </div> 
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Scrollbar from 'smooth-scrollbar';

export default {
  methods: {
    init_scroll() {
      Scrollbar.init(document.getElementById('customer'), {
        alwaysShowTracks: true,
      });
      Scrollbar.init(document.getElementById('customer_left'));
    },
    destroy_scroll() {
      Scrollbar.destroyAll(); // 路由更新销毁所有Scrollbar
    },
  },
  computed: {
    ...mapGetters(['user']),
  },
  mounted() {
    this.init_scroll();
  },
  beforeUpdate() {
    this.destroy_scroll();
  },
  updated() {
    if (this.$route.path.indexOf('customers') === -1) {
      return;
    }
    // 如果路由切到非customers模块，此时settings组件已销毁，如果执行destroyAll将会报错，故return
    this.$nextTick(() => {
      this.init_scroll(); // 更新完路由重新初始化路由更新销毁所有Scrollbar
    });
  },
};
</script>
<style lang="scss" scoped>
  .customers{
    .left{
      flex: 0 0 160px;
      width: 160px;
      .el-menu-vertical-demo{
        height: 100%;
      }
    }
    .right{
      flex: 1 1 auto;
      overflow: hidden;
      .info__view{
        min-height: 100%;
        min-width: 1200px;
        box-sizing: border-box;
      }
    }
  }
</style>
