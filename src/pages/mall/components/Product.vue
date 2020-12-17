<template>
  <el-card class="product" @mouseover.native="show_mask=true" @mouseleave.native="show_mask=false">
    <img class="picture" src="/static/logo2.png" :alt="product.product_name">
    <p class="title">{{product.product_name}}</p>
    <p>
      <span class="price">￥{{ (product.sale_price / 100).toFixed(2)}}</span>
      <span> / {{product.store_unit}}</span>
    </p>
    <p class="desc">{{product.title1}}</p>
    <transition name="mask">
      <div class="mask" v-show="show_mask">
          <div class="box">
            <el-button type="primary" size="mini" @click="add_to_cart">加入购物车</el-button>

            <transition name="addToCart" @after-enter='add_to_cart_flag=false;'>
              <p class="float-icon" v-show="add_to_cart_flag">
                <i class="el-icon-star-off"></i>
                <span>+ 1</span>
              </p>
            </transition>
          </div>
        
      </div>
    </transition>
    
  </el-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import deepcopy from '@/utils/deepcopy';

export default {
  data() {
    return {
      show_mask: false,
      add_to_cart_flag: false,
    };
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['cart']),
  },
  methods: {
    ...mapMutations(['update_cart']),
    add_to_cart() {
      if (!this.add_to_cart_flag) {
        this.add_to_cart_flag = true;
      }
      const list = this.cart ? deepcopy(this.cart) : [];
      const pro = list.find((product) => {
        return product.product_id === this.product.product_id;
      });
      if (pro) {
        pro.store_num += 1;
      } else {
        this.$set(this.product, 'store_num', 1);
        list.push(this.product);
      }
      this.update_cart(list);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@scss';

.product{
  position: relative;
  cursor: pointer;
  font-size: 12px;
  .picture{
    width: 100%;
    height: 180px;
  }
  .title{
    margin-top: 12px;
    font-size: 14px;
    font-weight: 600;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
  }
  .price{
    color: red;
    font-weight: 600;
    font-size: 14px;
  }
  .desc{
    line-height: 20px;
    color: $color-silver;
    width: 100%;
    height: 40px;
    overflow: hidden;
  }
  .mask{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(7, 17, 27, 0.7);
    .box{
      position: absolute;
      height: 60px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .float-icon{
        font-size: 30px;
        color: yellow;
      }
    }
  }
  .mask-enter-active {
    transition: all 1s ease;
  }
  .mask-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .mask-enter, .mask-leave-to{
    opacity: 0;
  }


  .addToCart-enter{
    transform: translateY(60px);
  }
  .addToCart-leave{
    transform: translateY(0);
  }
  .addToCart-enter-active, .addToCart-leave-active{
    transition: all .6s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
}
</style>
