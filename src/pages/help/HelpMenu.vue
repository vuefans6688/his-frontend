<template>
  <div class="help">
    <div class="left">
      <el-menu class="el-menu-vertical-demo" :default-active="$route.path" router>
        <el-menu-item index="/navigator/help/ManagementHelp">
          <i class="icon-magnet"></i><span>诊所管理</span>
        </el-menu-item>
        <el-menu-item index="/navigator/help/medHelp">
          <i class="icon-aid-kit"></i><span>药品进销存</span>
        </el-menu-item>
        <el-menu-item index="/navigator/help/regHelp">
          <i class="el-icon-check"></i><span>登记挂号</span>
        </el-menu-item>
        <el-menu-item index="/navigator/help/Stationhelp">
          <i class="icon-user-check"></i><span>医生站</span>
        </el-menu-item>
        <el-menu-item index="/navigator/help/feeHelp">
          <i class="icon-coin-yen"></i><span>收费</span>
        </el-menu-item>
        <el-menu-item index="/navigator/help/pharhelp">
          <i class="icon-pie-chart"></i><span>药房</span>
        </el-menu-item>
        <el-menu-item index="/navigator/help/tempHelp">
          <i class="el-icon-document"></i><span>模板</span>
        </el-menu-item>
        <el-menu-item index="/navigator/help/printHelp">
          <i class="icon-printer"></i><span>打印</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right">
      <router-view class='help__view'></router-view>
    </div>
  </div>
</template>
<script>

export default {
  methods: {
  },
};
</script>
<style lang="scss" scoped>
@import "~@scss";
  .help{
    .left{
      flex: 0 0 160px;
      width: 160px;
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
      overflow-x: auto;
      .help__view{
        min-width: 400px;
      }
    }
  }
</style>
