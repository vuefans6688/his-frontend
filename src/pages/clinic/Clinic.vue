<template>
  <div class="info">
    <div class="left scroll_height" id="clinic_left">
      <el-menu class="el-menu-vertical-demo" :default-active="$route.path" router :default-openeds='["1", "2"]'>
        <el-menu-item index="/navigator/settings/registInfo">
          <i class="icon-user-check"></i><span>注册信息</span>
        </el-menu-item>
        <el-menu-item index="/navigator/settings/sectionManage">
          <i class="el-icon-tickets"></i><span>科室管理</span>
        </el-menu-item>
        <el-menu-item index="/navigator/settings/staffManage">
          <i class="icon-user-check"></i><span>人员管理</span>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>收费项目</span>
          </template>
          <el-menu-item-group class="secondary">
            <!-- <el-menu-item index="/navigator/settings/registrationFee">挂号设置</el-menu-item> -->
            <el-menu-item index="/navigator/settings/diagnosisFee">诊金设置</el-menu-item>
            <el-menu-item index="/navigator/settings/treatment">诊疗项目</el-menu-item>
            <el-menu-item index="/navigator/settings/material">耗材设置</el-menu-item>
            <el-menu-item index="/navigator/settings/others">其他收费项</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
           <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>医保管理</span>
          </template>
          <el-menu-item-group class="secondary">
            <el-menu-item index="/navigator/settings/medicalInsurance/bind">医保绑定</el-menu-item>
            <el-menu-item index="/navigator/settings/medicalInsurance/drugCheckin">药品准入管理</el-menu-item>
            <el-menu-item index="/navigator/settings/medicalInsurance/projectCheckin">诊疗项目准入管理</el-menu-item>
            <el-menu-item index="/navigator/settings/medicalInsurance/materialCheckin">耗材准入管理</el-menu-item>
            <el-menu-item index="/navigator/settings/medicalInsurance/accounts/all">对账管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- <el-menu-item index="/navigator/settings/printSetting">
          <i class="el-icon-tickets"></i><span>打印设置</span>
        </el-menu-item> -->
      </el-menu>
    </div>
    <div class="right" id="clinic">
      <router-view class='info__view' @initScroll="init_scroll" @destroyScroll="destroy_scroll"></router-view>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Scrollbar from 'smooth-scrollbar';

export default {
  methods: {
    init_scroll() {
      Scrollbar.init(document.getElementById('clinic'), {
        alwaysShowTracks: true,
      });
      Scrollbar.init(document.getElementById('clinic_left'));
    },
    destroy_scroll() {
      Scrollbar.destroyAll();
    },
  },
  computed: {
    ...mapGetters(['clinic', 'user']),
  },
  mounted() {
    this.init_scroll();
  },
  beforeUpdate() {
    this.destroy_scroll(); // 路由更新销毁所有Scrollbar
  },
  updated() {
    if (this.$route.path.indexOf('settings') === -1) {
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
@import "~@scss";
  .info{
    .left{
      flex: 0 0 160px;
      width: 160px;
      .el-menu-vertical-demo{
        height: 100%;
        .el-menu-item{
          min-width: 0;
          i{
            @include icon_size;
          }
          .el-menu .secondary .el-menu-item{
            font-size: 12px;
          }
        }
        .el-submenu{
          .el-menu-item-group__title{
            padding: 0;
          }
          .el-menu-item{
            height: 40px;
            line-height: 40px;
            font-size: 12px;
          }
        }
      }
    }
    .right{
      flex: 1 1 auto;
      min-width: 400px;
      .info__view{
        min-height: 100%;
        min-width: 1000px;
        box-sizing: border-box;
      }
    }
  }
</style>
