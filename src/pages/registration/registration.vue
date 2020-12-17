<template>
    <div class="registration_componnent">
        <div class="left" id='regLeft'>
             <el-menu class="el-menu-vertical-demo" :default-active="$route.path" router>
                <el-menu-item index="/navigator/registration/addregistration">
                  <i class="el-icon-edit-outline"></i>登记挂号
              </el-menu-item>
              <el-menu-item index="/navigator/registration/registrationInfo">
                  <i class="el-icon-tickets"></i>登记列表
                </el-menu-item>
              <el-menu-item  index="/navigator/registration/appointment">
                  <i class="el-icon-tickets"></i>预约挂号
                </el-menu-item>
            </el-menu> 
        </div>
        <div class="right" id='regRight'>
          <router-view class="view" @destroyScroll="destroy_scroll" @initScroll="init_scroll"></router-view>
        </div>
    </div>
</template>

<script>
import Scrollbar from 'smooth-scrollbar';

export default {
  methods: {
    init_scroll() {
      Scrollbar.init(document.querySelector('#regLeft'));
      Scrollbar.init(document.querySelector('#regRight'), {
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
    if (this.$route.path.indexOf('registration') === -1) {
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
  .registration_componnent{
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
            position: relative;
            box-sizing: border-box;
            min-width: 1100px;
        }
      }
  }
</style>
