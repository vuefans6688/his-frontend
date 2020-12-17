<template>
  <div class="container">
    <el-row class="header" v-if="cart && cart.length">
      <el-col :span="2"><el-checkbox v-model="is_all_selected" @change='toggle_select'></el-checkbox></el-col>
      <el-col :span="12">商品</el-col>
      <el-col :span="2">单价</el-col>
      <el-col :span="4">数量</el-col>
      <el-col :span="2">小计</el-col>
      <el-col :span="2">操作</el-col>
    </el-row>

    <div v-else class="data_not_found">
      <img src="../../../assets/img/empty_cart.jpg"/>
    </div>

    <div class="list">
      <transition-group name="prod" tag="p">
        <el-row v-for="(prod, i) in cart" :key='prod.product_id' class="product">
          <el-col :span="2"><el-checkbox v-model="prod.is_select"></el-checkbox></el-col>
          <el-col :span="12">
            <div class="product_desc">
              <img class="picture" src="/static/logo2.png" :alt="prod.picture" @dragstart="(e)=>{e.preventDefault();}">
              <div class="right">
                <p class="title">{{prod.product_name}}</p>
                <p class="description">{{prod.title1}}</p>
              </div>
            </div>
          </el-col>
          <el-col :span="2" class="price">￥ {{(prod.sale_price/100).toFixed(2)}}</el-col>
          <el-col :span="4">
            <el-input-number v-model="prod.store_num" size="mini" :min="1" @change='(e)=>{modify_total(e,prod.product_id)}'></el-input-number></el-col>
          <el-col :span="2" class="price">￥ {{ ((prod.sale_price * prod.store_num)/100).toFixed(2) }}</el-col>
          <el-col :span="2"><span class="remove" @click="remove(i)">移除</span></el-col>
        </el-row>
      </transition-group>
      
    </div>


    <div class="wrap" v-show="total_price>0">
      <div class="left">总计: ￥{{total_price}}</div>
      <div class="right" @click="submit">结算</div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['cart']),
    is_all_selected: {
      set() {},
      get() {
        if (!this.cart || !this.cart.length) {
          return false;
        }
        return this.cart.every((item) => {
          return item.is_select;
        });
      },
    },
    selected_prods() {
      if (!this.cart || !this.cart.length) {
        return [];
      }
      return this.cart.filter((prod) => {
        return prod.is_select;
      });
    },
    total_price() {
      return (this.selected_prods.reduce((total, prod) => {
        return total + (prod.sale_price * prod.store_num);
      }, 0) / 100).toFixed(2);
    },
  },
  methods: {
    ...mapMutations(['update_cart', 'update_prepare_to_pay_list']),
    init_cart(flag = false) {
      this.cart.forEach((prod) => {
        this.$set(prod, 'is_select', flag);
      });
    },
    toggle_select(flag) {
      this.init_cart(flag);
    },
    // 修改数量
    modify_total(e, product_id) {
      const list = this.cart;
      const prod = list.find((v) => { return v.product_id === product_id; });
      prod.store_num = e;
      this.update_cart(list);
    },
    // 删除
    remove(i) {
      const list = this.cart;
      list.splice(i, 1);
      this.update_cart(list);
    },
    // 下单
    submit() {
      this.update_prepare_to_pay_list(this.selected_prods);
      this.$router.push({ path: 'submit_order' });
    },
  },
  created() {
    this.init_cart(true);
  },
};
</script>

<style lang="scss" scoped>
@import '~@scss';

.container{
  padding: 30px 40px;
  .header{
    padding: 0 12px;
    height: 36px;
    line-height: 36px;
    background: #000;
    color: #fff;
    font-size: 16px;
  }
  .data_not_found{
    text-align: center;
  }
  .list{
    margin-top: 24px;
    .product{
      padding: 0 12px;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      height: 140px;
      background: #fcfcfc;
      border: 1px solid #ccc;
      .product_desc{
        display: flex;
        .picture{
          flex: 0 0 120px;
          width: 120px;
          height: 120px;
        }
        .right{
          flex: 1 1 auto;
          margin-left: 60px;
          margin-right: 60px;
          .title{
            font-size: 16px;
            font-weight: 600;
          }
          .description{
            margin-top: 6px;
            font-size: 12px;
            line-height: 24px;
            height: 72px;
            overflow: hidden;
            color: $color-exlight-black;
          }
        }
      }
      .price{
        color: #f40;
        font-size: 18px;
      }
      .remove{
        display: inline-block;
        padding: 6px 12px;
        color: $color-red;
        cursor: pointer;
      }
    }
  }

  .wrap{
    display: flex;
    justify-content: flex-end;
    height: 48px;
    color: #fff;
    .left{
      padding: 0 24px;
      background: rgba(7, 17, 27, 0.9);
      line-height: 48px;
    }
    .right{
      padding: 0 24px;
      background: #FF3030;
      font-size: 16px;
      line-height: 48px;
      cursor: pointer;
    }
  }

  .prod-leave-active{
    transition: all .5s ease;
  }
  .prod-leave-to{
    opacity: 0;
  }
}
</style>
