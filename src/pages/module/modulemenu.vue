<template>
    <div class="modulemenu">
        <div class="left" id="moduleLeft">
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router>
                <el-menu-item index="/navigator/modulemenu/medicalrecords">
                    <i class="el-icon-menu"></i>病历模板
                </el-menu-item>
                <el-menu-item index="/navigator/modulemenu/formulation/west">
                    <i class="el-icon-menu"></i>西/成药处方模板
                </el-menu-item>
                <el-menu-item index="/navigator/modulemenu/formulation/china">
                    <i class="el-icon-menu"></i>中药处方模板
                </el-menu-item>
                <el-menu-item index="/navigator/modulemenu/formulation/infusion">
                    <i class="el-icon-menu"></i>输液处方模板
                </el-menu-item>
                <el-menu-item index="/navigator/modulemenu/formulation/check">
                    <i class="el-icon-menu"></i>诊疗项目模板
                </el-menu-item>
                <el-menu-item index="/navigator/modulemenu/formulation/material">
                    <i class="el-icon-menu"></i>耗材组合模板
                </el-menu-item>
                <el-menu-item index="/navigator/modulemenu/formulation/others">
                    <i class="el-icon-menu"></i>其他项目模板
                </el-menu-item>
                <!-- <el-menu-item index="/navigator/modulemenu/formulation/advice">
                    <i class="el-icon-menu"></i>常用医嘱模板
                </el-menu-item> -->
            </el-menu>
        </div>
        <div class="right" id="moduleRight">
            <router-view class="view" @destroyScroll="destroy_scroll" @initScroll="init_scroll"></router-view>
        </div>
    </div>
</template>

<script>
import Scrollbar from 'smooth-scrollbar';

export default {
  methods: {
    init_scroll() {
      Scrollbar.init(document.querySelector('#moduleLeft'));
      Scrollbar.init(document.querySelector('#moduleRight'), {
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
    if (this.$route.path.indexOf('modulemenu') === -1) {
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
.modulemenu {
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
        .el-menu-item{
            font-size: 14px;
        }
    }
    .right {
        flex: 1 1 auto;
        overflow: auto;
        .view {
            min-height: 100%;
            position: relative;
            box-sizing: border-box;
            min-width: 1100px;
            padding-bottom: 60px;
        }
    }
}
a {
    text-decoration: none;
}
</style>
