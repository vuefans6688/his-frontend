<template>
  <div class="exam">
    <div class="left" id="exam_left">
      <el-menu class="el-menu-vertical-demo" :default-active="$route.path" router>
        <el-menu-item index="/navigator/mall/product_list">
          <i class="el-icon-goods"></i>商品列表
        </el-menu-item>
        <el-menu-item index="/navigator/mall/shop_cart">
          <i class="el-icon-shopping-cart-full" style="font-size: 20px;"></i>购物车
          <el-badge v-if="cart.length" :value="cart.length" class="item"></el-badge>
        </el-menu-item>
        <el-menu-item index="/navigator/mall/orders">
          <i class="el-icon-tickets"></i>我的订单
        </el-menu-item>
        <el-menu-item index="/navigator/mall/address_list">
          <i class="el-icon-tickets"></i>地址管理
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right" id="exam">
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
      Scrollbar.init(document.getElementById('exam'), {
        alwaysShowTracks: true,
      });
      Scrollbar.init(document.getElementById('exam_left'));
    },
    destroy_scroll() {
      Scrollbar.destroyAll(); // 路由更新销毁所有Scrollbar
    },
  },
  computed: {
    ...mapGetters(['cart']),
  },
  mounted() {
    this.init_scroll();
  },
  beforeUpdate() {
    this.destroy_scroll();
  },
  updated() {
    if (this.$route.path.indexOf('mall') === -1) {
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
        box-sizing: border-box;
      }
    }
  }
</style>
