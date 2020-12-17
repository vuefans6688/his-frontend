<template>
  <div class="container">
    <div class="header">
      <p class="line">澳考科技 收银台</p>
    </div>

    <div class="product">
      <p class="line">
        <span class="label">订单编号: </span>
        <span class="value">{{order.order_createtime}}</span>
      </p>
      <p class="line">
        <span class="label">收货人姓名: </span>
        <span class="value">{{order.receiver_name}}</span>
      </p>
      <p class="line">
        <span class="label">收货人电话: </span>
        <span class="value">{{order.receiver_phone}}</span>
      </p>
      <p class="line">
        <span class="label">收货地址: </span>
        <span class="value">{{order.receiver_addr}}</span>
      </p>
      <p class="line">
        <span class="label">备注: </span>
        <span class="value">{{order.order_note}}</span>
      </p>
      <p class="line">
        <span class="label">商品列表: </span>
        <span class="value" v-for="prod in product_list" :key="prod.product_id">
          {{prod.product_name}} * {{prod.store_num}}
        </span>
      </p>
      <p class="line">
        <span class="label">支付金额: </span>
        <span class="value"><i class="price">{{(order.total_price/100).toFixed(2)}}</i> 元</span>
      </p>
    </div>


    <p class="pay_methods">
      <img class="picture" src="../../../assets/img/WePayLogo.png" alt="">
      <img class="picture" src="../../../assets/img/support.png" alt="">
      <span class="tips">亿万用户的选择, 更快捷更安全</span>
      <span class="right">支付<i class="price">{{(order.total_price/100).toFixed(2)}}</i> 元</span>
    </p>

    <div>
      <img ref='qr_code' class="qr_code" :src="code_url"/>
    </div>

    <div><img class="tips" src="../../../assets/img/tips.png" alt=""></div>

    <el-button class="pay" size="mini" type="primary" @click="cancel_pay">取消支付</el-button>

  </div>
</template>


<script>
import QrCodeWithLogo from 'qr-code-with-logo';
import { getOrderDetail } from '@apiNormal';
import httpServerNormal from '@httpServerNormal';

export default {
  data() {
    return {
      order_id: '',
      order: {},
      product_list: [],
      code_url: '',
      timer: null,
      count: 0,
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
          if (this.count === 0) {
            this.gen_qrcode_url();
          }
          this.count += 1;
          if (res.order.status_index > 0) {
            this.pay_success();
          }
        }
      });
    },
    gen_qrcode_url() {
      QrCodeWithLogo.toImage({
        image: this.$refs.qr_code,
        content: this.order.code_url,
        width: 240,
        logo: {
          src: '/static/logo.png',
          logoRadius: 10,
          logoSize: 0.35,
          bgColor: 'transparent',
        },
        nodeQrCodeOptions: {
          margin: 0,
        },
      });
    },
    pay_success() {
      this.clear_timer();
      const loading = this.$loading({ lock: true, text: '订单支付成功, 正在返回...', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)' });
      setTimeout(() => {
        loading.close();
        this.$router.replace('orders');
      }, 5000);
    },
    cancel_pay() {
      this.$router.go(-1);
    },
    clear_timer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
  },
  created() {
    this.order_id = this.$route.query.order_id;
    this.get_order();
    this.timer = setInterval(this.get_order, 5000);
  },
  beforeDestroy() {
    this.clear_timer();
  },
};
</script>

<style lang="scss" scoped>
@import '~@scss';

.container{
  padding: 30px 40px;

  .header{
    font-size: 20px;
    font-weight: 600;
  }

  .product{
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
      }
    }
  }

  .pay_methods{
    margin: 24px 0;
    padding: 6px 12px;
    display: flex;
    align-items: center;
    border: 1px solid $mainColor;
    border-radius: 6px;
    .picture{
      margin-right: 12px;
      height: 30px;
    }
    .tips{
      color: $color-silver;
    }
    .right{
      margin-left: auto;
      .price{
        font-size: 18px;
        color: $color-red;
      }
    }
  }

  .qr_code{
    // width: 240px;
    // height: 240px;
    vertical-align: top;
  }
  .tips{
    width: 240px;
  }

  .pay{
    margin-top: 24px;
  }
}
</style>
