<template>
  <div class="exam">
    <div class="left" id="exam_left">
      <el-menu class="el-menu-vertical-demo" :default-active="$route.path" router :default-openeds='["1", "2"]'>
        <el-menu-item index="/navigator/exam/report_list">
          <i class="icon-user-check"></i>报告查看
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="icon-organization"></i>
            <span>血常规分析仪</span>
          </template>
          <el-menu-item-group class="secondary">
            <el-menu-item index="/navigator/exam/CBC_equipment">设备管理</el-menu-item>
            <el-menu-item index="/navigator/exam/CBC_report_list">报告打印</el-menu-item>
            <!-- <el-menu-item index="/navigator/exam/CBC_statistics">数据统计</el-menu-item> -->
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="right" id="exam">
      <router-view class='info__view' @initScroll="init_scroll" @destroyScroll="destroy_scroll"></router-view>
    </div>
  </div>
</template>
<script>
import Scrollbar from 'smooth-scrollbar';

export default {
  methods: {
    init_scroll() {
      Scrollbar.init(document.getElementById('exam'), {
        alwaysShowTracks: true,
      });
      Scrollbar.init(document.getElementById('exam_left'));
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
    if (this.$route.path.indexOf('exam') === -1) {
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
 .exam{
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
