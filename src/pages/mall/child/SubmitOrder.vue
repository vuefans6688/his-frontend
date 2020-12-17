<template>
  <div class="container">
    <h1 class="header">个人信息/地址</h1>
    <div class="address_list">
      <div class="address_item" v-for="(address, i) in address_list" :key="address.key" :class="{'active': active_i === i}" @click='active_i=i;'>
        <p class="address"><span class="area">{{ address | address_filter }} </span></p>
        <p class="detail">{{ address | detail_filter }} </p>
        <p><i>({{address.receiver_name}} 收)</i></p>
        <i class="el-icon-location selected" v-if="active_i === i"></i>
      </div>
    </div>
    <div class="new_address"><el-button size="mini" type='primary' @click="$router.push('address_list');">添加新地址</el-button></div>

    <div class="products">
      <el-row class="header">
        <el-col :span="16">商品</el-col>
        <el-col :span="2">单价</el-col>
        <el-col :span="4">数量</el-col>
        <el-col :span="2">小计</el-col>
      </el-row>
      <Product v-for="(prod, i) in product_list" :key="i" :prod='prod'></Product>
    </div>

    <el-form :model="user" ref="address" label-width="100px" label-position="left" size="small">
      <el-form-item label="订单备注:" prop="">
        <el-input type="textarea" placeholder="订单备注" v-model="user.order_note"></el-input>
      </el-form-item>
    </el-form>

    <div class="wrap">
      <div class="left">总计: ￥{{(total_price/100).toFixed(2)}}</div>
      <div class="right" @click="submit">结算</div>
    </div>


  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { createOrder, getAddressList } from '@apiNormal';
import httpServerNormal from '@httpServerNormal';
import provinceList from '@/common/js/provinceList';
import Product from '../components/Product2';

export default {
  components: { Product },
  data() {
    return {
      active_i: 0,
      address_list: [],
      product_list: [],
      total_price: 0,
      user: {
        order_note: '',
      },
    };
  },
  computed: {
    ...mapGetters(['cart', 'prepare_to_pay_list']),
  },
  methods: {
    ...mapMutations(['update_cart', 'update_prepare_to_pay_list']),
    get_address_list() {
      httpServerNormal(getAddressList).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.address_list = res && res.context ? res.context : [];
          this.active_i = this.address_list.findIndex(v => v.default_item) > -1 ? this.address_list.findIndex(v => v.default_item) : 0;
        }
      });
    },
    // 下单
    submit() {
      if (!(this.address_list && this.address_list.length)) {
        this.$confirm('是否立即维护收货地址?', '提示', { type: 'warning' }).then(() => {
          this.$router.push('address_list');
        }).catch(() => {});
        return;
      }
      const address = this.address_list[this.active_i];

      const province = provinceList[address.province_id - 1];
      const city = province.childrenList.find(v => v.areaId === address.city_id);
      const area = city.childrenList.find(v => v.areaId === address.area_id);
      const receiver_addr = province.areaName + city.areaName + area.areaName + address.detail;

      httpServerNormal(createOrder, {
        receiver_name: address.receiver_name,
        receiver_phone: address.receiver_phone,
        receiver_addr,
        order_note: this.user.order_note,
        product_list: this.product_list.map(prod => ({ product_id: prod.product_id, store_num: prod.store_num, total_fee: prod.store_num * prod.sale_price })),
        total_price: this.total_price,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.delete_from_cart();
          this.$router.replace({ path: 'pay', query: { order_id: res.order.order_id } });
        }
      });
    },
    // 更新购物车
    delete_from_cart() {
      const cart = this.cart.filter(prod => !this.prepare_to_pay_list.find(prod2 => prod2.product_id === prod.product_id));
      this.update_cart(cart);
      this.update_prepare_to_pay_list([]);
    },
  },
  filters: {
    address_filter(address) {
      const province = provinceList[address.province_id - 1];
      const city = province.childrenList.find(v => v.areaId === address.city_id);
      const area = city.childrenList.find(v => v.areaId === address.area_id);
      return `${province.areaName}-${city.areaName}-${area.areaName}`;
    },
    detail_filter(address) {
      return `${address.detail}  ${address.receiver_phone}`;
    },
  },
  created() {
    this.product_list = this.prepare_to_pay_list;
    this.total_price = this.prepare_to_pay_list.reduce((total, item) => (total + (item.store_num * item.sale_price)), 0);
    this.get_address_list();
  },
};
</script>


<style lang="scss" scoped>
@import "~@scss";

.container{
  padding: 30px 40px;
  .header{
    font-weight: 700;
  }
  .address_list{
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    .address_item{
      position: relative;
      flex: 0 0 200px;
      padding: 20px;
      margin-right: 50px;
      margin-bottom: 50px;
      border: 3px dashed #ccc;
      &.active{
        border-color: $color-red;
      }
      cursor: pointer;
      .detail{
        line-height: 36px;
      }
      .address{
        font-size: 14px;
        .area{
          font-size: 16px;
          font-weight: 600;
        }
      }
      .selected{
        position: absolute;
        right: 12px;
        top: 12px;
        color: $color-red;
        font-size: 20px;
      }
    }
  }

  .products{
    margin-top: 24px;
    .header{
      padding: 0 12px;
      height: 36px;
      line-height: 36px;
      background: #000;
      color: #fff;
      font-size: 16px;
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
}
</style>
