<template>
  <div class="order">
    <h1 class="title">订单详情 <el-button size="mini" type="danger" class="back" @click="back"> 返回 </el-button></h1>

    <div class="info">
      <p class="line">
        <span class="label">订单编号: </span>
        <span class="value">{{order.order_createtime}}</span>
      </p>
      <p class="line">
        <span class="label">下单时间: </span>
        <span class="value">{{order.order_createtime | datetime_filter}}</span>
      </p>
      <p class="line">
        <span class="label">订单状态: </span>
        <span class="value">
          <span class="status">{{order.status_index | status_filter}}</span>
          <a class="pay" v-if="order.status_index===0" @click="pay">去支付</a>
        </span>
      </p>
      <p class="line">
        <span class="label">收货人: </span>
        <span class="value">{{order.receiver_name}}</span>
      </p>
      <p class="line">
        <span class="label">收货电话: </span>
        <span class="value">{{order.receiver_phone}}</span>
      </p>
      <p class="line">
        <span class="label">收货地址: </span>
        <span class="value">{{order.receiver_addr}}</span>
      </p>
      <p class="line">
        <span class="label">订单备注: </span>
        <span class="value">{{order.order_note}}</span>
      </p>
      <p class="line">
        <span class="label">订单金额: </span>
        <span class="value"><i class="price">{{(order.total_price / 100).toFixed(2)}}</i> 元</span>
      </p>
    </div>

    <div class="products">
      <el-row class="header">
        <el-col :span="16">商品</el-col>
        <el-col :span="2">单价</el-col>
        <el-col :span="4">数量</el-col>
        <el-col :span="2">小计</el-col>
      </el-row>
      <Product v-for="(prod, i) in product_list" :key="i" :prod='prod'></Product>
    </div>


  </div>
</template>

<script>
import { getOrderDetail } from '@apiNormal';
import httpServerNormal from '@httpServerNormal';
import { NanoSecToDateTime } from '@/utils/dateUtils';
import Product from '../components/Product2';

export default {
  components: { Product },
  data() {
    return {
      order_id: '',
      order: {},
      product_list: [],
    };
  },
  methods: {
    get_order() {
      httpServerNormal(getOrderDetail, {
        order_id: this.order_id,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.order = res.order;
          this.product_list = res.product_list;
        }
      });
    },
    pay() {
      this.$router.push({ path: 'pay', query: { order_id: this.order_id } });
    },
    back() {
      this.$router.go(-1);
    },
  },
  filters: {
    datetime_filter(datetime) {
      return NanoSecToDateTime(datetime);
    },
    status_filter(status) {
      let status_text = '';
      switch (status) {
        case 0: status_text = '未支付'; break;
        case 1: status_text = '已支付'; break;
        case 2: status_text = '商家已确认订单'; break;
        case 3: status_text = '商家已发货'; break;
        case 4: status_text = '买家收货'; break;
        case 5: status_text = '5买家申请退货'; break;
        case 6: status_text = '买家退货已发货'; break;
        case 7: status_text = '商家已收退货'; break;
        case 8: status_text = '商家已退钱'; break;
        case 9: status_text = '订单交易完成'; break;
        case 10: status_text = '订单已评价'; break;
        case 11: status_text = '订单已作废'; break;
        case 12: status_text = '买家已删除订单'; break;
        default: break;
      }
      return status_text;
    },
  },
  created() {
    this.order_id = this.$route.query.order_id;
    this.get_order();
  },
};
</script>

<style lang="scss" scoped>
@import '~@scss';

.order{
  padding: 30px 40px;
  .title{
    font-size: 16px;
    font-weight: 600;
    .back{
      margin-left: 24px;
    }
  }

  .info{
    margin-top: 10px;
    padding: 12px 0;
    background-color: $color-light-gray;
    .line{
      display: flex;
      line-height: 36px;
      .label{
        flex: 0 0 120px;
        text-align: right;
      }
      .value{
        flex: 1 1 auto;
        padding-left: 24px;
        .price{
          color: $color-red;
          font-size: 20px;
        }
        .status{
          font-size: 16px;
          color: $color-red;
        }
        .pay{
          margin-left: 12px;
          cursor: pointer;
        }
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
}
</style>
