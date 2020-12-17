<template>
    <div class="statistics_componnent" v-loading="fullscreenLoading" element-loading-text="功能完善中，敬请期待" 
    element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.7)">
        <div class="left" id='statisticsLeft' v-show="!fullscreenLoading">
             <el-menu class="el-menu-vertical-demo" :default-active="$route.path" router>
                <el-menu-item index="/navigator/statistics/logbook">
                  <i class="el-icon-edit-outline"></i>接诊日志
                </el-menu-item>
                <el-menu-item index="/navigator/statistics/chargestatistics">
                  <i class="el-icon-date"></i>收费统计
                </el-menu-item>
                <el-menu-item index="/navigator/statistics/checkstatistics">
                  <i class="el-icon-date"></i>诊疗项目统计 
                </el-menu-item>
                <el-menu-item index="/navigator/statistics/drugstatistics">
                  <i class="el-icon-date"></i>药品销售统计
                </el-menu-item>
                <el-menu-item index="/navigator/statistics/doctorstatistics">
                  <i class="el-icon-date"></i>医生工作量统计
                </el-menu-item>
            </el-menu> 
        </div>
        <div class="right" id='statisticsRight' v-show="!fullscreenLoading">
            <router-view class="view" @destroyScroll="destroy_scroll" @initScroll="init_scroll"></router-view>
        </div>
    </div>
</template>

<script>
import Scrollbar from 'smooth-scrollbar';

export default {
  data() {
    return {
      fullscreenLoading: false,   // 隐藏内容，改成false则显示
    };
  },
  methods: {
    init_scroll() {
      Scrollbar.init(document.querySelector('#statisticsLeft'));
      Scrollbar.init(document.querySelector('#statisticsRight'), {
        alwaysShowTracks: true,
      });
    },
    destroy_scroll() {
      Scrollbar.destroyAll();
    },
  },
  mounted() {
    this.init_scroll();
  },
  beforeUpdate() {
    this.destroy_scroll(); // 路由更新销毁所有Scrollbar
  },
  updated() {
    if (this.$route.path.indexOf('statistics') === -1) {
      return;
    }
    // 如果路由切到非settings模块，此时settings组件已销毁，如果执行destroyAll将会报错，故return
    this.$nextTick(() => {
      this.init_scroll(); // 更新完路由重新初始化路由更新销毁所有Scrollbar
    });
  },
};
</script>

<style lang="scss" scoped>
  .statistics_componnent{
      .left{
          flex: 0 0 160px;
          width: 160px;
          height: 100%;
          .el-menu-vertical-demo{
              height: 100%;
          }
      }
      .right{
        flex: 1 1 auto;
        overflow: auto;
        .view {
            padding: 30px 40px 60px 40px;
            min-height: 100%;
            // min-width: 1100px;
        }
      }
  }
</style>
