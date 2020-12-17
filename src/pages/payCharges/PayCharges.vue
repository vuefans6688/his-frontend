<template>
    <div class="payCharges_componnent">
        <div class="left" id='payChargesLeft'>
            <el-menu class="el-menu-vertical-demo" :default-active="$route.path" router :default-openeds='["1", "2"]'>
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>收费</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/navigator/payCharges/payChargesList">待收费</el-menu-item>
                        <el-menu-item index="/navigator/payCharges/payChargesHistory">收费记录</el-menu-item>
                        <el-menu-item index="/navigator/payCharges/directSell">门诊购药</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>发药</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/navigator/payCharges/sell">待发药</el-menu-item>
                        <el-menu-item index="/navigator/payCharges/records">发药记录</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </div>
        <div class="right" id='payChargesRight'>
            <router-view class="view" @initScroll="init_scroll" @destroyScroll="destroy_scroll"></router-view>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Scrollbar from 'smooth-scrollbar';

export default {
  methods: {
    init_scroll() {
      Scrollbar.init(document.getElementById('payChargesLeft'));
      Scrollbar.init(document.getElementById('payChargesRight'), {
        alwaysShowTracks: true,
      });
    },
    destroy_scroll() {
      Scrollbar.destroyAll();
    },
  },
  computed: {
    ...mapGetters(['user', 'main_mune_list']),
  },
  beforeUpdate() {
    this.destroy_scroll(); // 路由更新销毁所有Scrollbar
  },
  updated() {
    if (this.$route.path.indexOf('payCharges') === -1) {
      return;
    }
    // 如果路由切到非settings模块，此时settings组件已销毁，如果执行destroyAll将会报错，故return
    this.$nextTick(() => {
      this.init_scroll(); // 更新完路由重新初始化路由更新销毁所有Scrollbar
    });
  },
  mounted() {
    this.init_scroll();
  },
};
</script>

<style lang="scss" scoped>
.payCharges_componnent {
    .left {
        flex: 0 0 160px;
        width: 160px;
        height: 100%;
        .el-menu-vertical-demo {
            height: 100%;
        }
        .el-menu-item,
        .el-submenu__title {
            padding-right: 0;
        }
    }
    .right {
        flex: 1 1 auto;
        .view{
            min-height: 100%;
            box-sizing: border-box;
        }
    }
}
</style>
