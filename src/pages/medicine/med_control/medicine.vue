<template>
  <div class="medicine">
    <div class="left" id="medLeft">
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router>
        <el-menu-item index="/navigator/medicine/medicineInfo">
          <i class="el-icon-upload"></i>药品信息维护
        </el-menu-item>
        <el-menu-item index="/navigator/medicine/medsuppliers">
          <i class="el-icon-phone-outline"></i>供应商维护
        </el-menu-item>
        <el-menu-item index="/navigator/medicine/medprocurement">
          <i class="el-icon-goods"></i>采购入库
        </el-menu-item>
        <!-- <el-menu-item index="/navigator/medicine/medaudit">
          <i class="el-icon-menu"></i>入库审核
        </el-menu-item>
        <el-menu-item index="/navigator/medicine/medpricing">
          <i class="el-icon-menu"></i>药品调价
        </el-menu-item> -->
        <el-menu-item index="/navigator/medicine/medinventory">
          <i class="el-icon-menu"></i>库存盘点
        </el-menu-item>
        <el-menu-item index="/navigator/medicine/medenquiries">
          <i class="el-icon-location"></i>库存查询
        </el-menu-item>
        <el-menu-item index="/navigator/medicine/medeffective">
          <i class="el-icon-menu"></i>药品预警
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right" id="medRight">
      <router-view class="view" @destroyScroll="destroy_scroll" @initScroll="init_scroll"></router-view>
    </div>
  </div>
</template>

<script>
import Scrollbar from 'smooth-scrollbar';

export default {
  methods: {
    init_scroll() {
      Scrollbar.init(document.querySelector('#medLeft'));
      Scrollbar.init(document.querySelector('#medRight'), {
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
    if (this.$route.path.indexOf('medicine') === -1) {
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
.medicine {
  display: flex;
  position: fixed;
  left: 0;
  top: 65px;
  right: 0;
  bottom: 0;
  .left {
    flex: 0 0 160px;
    width: 160px;
    height: 100%;
    .el-menu-vertical-demo {
        height: 100%;
    }
  }
  .right {
    flex: 1 1 auto;
    overflow: auto;
    .view{
      min-height: 100%;
    }
  }
}
a {
  text-decoration: none;
}
</style>
