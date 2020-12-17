<template>
  <div class="container">

    <el-row class="product-list">
      <el-col class="product_item" v-for="(product, i) in product_list" :key="i" :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
        <product :product='product'></product>
      </el-col>
    </el-row>

    <el-pagination v-show="product_list.length" class="pagination" background layout="prev, pager, next,jumper,  total" :total="total" :page-size='page_size' :current-page='page_index' @current-change='current_change'></el-pagination>
    
    <div v-show="product_list.length" class="cart_control" @click="$router.push('shop_cart');">
      <i class="el-icon-shopping-cart-2 icon"></i>
      <span class="total">总计(￥{{total_momey}})</span>
    </div>

    <!-- 没有数据 -->
    <p class="data_not_found" v-if="!product_list.length">
     <i class="el-icon-s-help icon"></i>
     <span>暂无数据</span> 
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { GetProductList } from '@apiNormal';
import httpServerNormal from '@httpServerNormal';
import Product from '../components/Product';

export default {
  components: { Product },
  data() {
    return {
      product_list: [],
      total: 0,
      page_size: 12,
      page_index: 1,
    };
  },
  computed: {
    ...mapGetters(['cart']),
    total_momey() {
      return (this.cart.reduce((total, item) => {
        return total + (item.sale_price * item.store_num);
      }, 0) / 100).toFixed(2);
    },
  },
  methods: {
    get_list() {
      httpServerNormal(GetProductList, {
        pagesize: this.page_size,
        pageid: this.page_index,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.product_list = res && res.context ? res.context : [];
          this.total = res && res.pagecount ? res.pagecount : 0;
        }
      });
    },
    current_change(page_index) {
      this.page_index = page_index;
      this.get_list();
    },
  },
  created() {
    this.get_list();
  },
};
</script>

<style lang="scss" scoped>
@import '~@scss';

.container{
  position: relative;
  padding: 30px 40px 30px 0;
  padding-bottom: 120px;
  .product-list{
    .product_item{
      padding-left: 40px;
      padding-bottom: 30px;
    }
  }
  .pagination{
    position: absolute;
    bottom: 80px;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .cart_control{
    position: absolute;
    padding: 10px 30px;
    right: 24px;
    bottom: 12px;
    display: flex;
    align-items: center;
    background: #c81623;
    color: #fff;
    cursor: pointer;
    .icon{
      margin-right: 6px;
      font-size: 26px;
    }
  }
  .data_not_found{
    margin-top: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $color-silver;
    font-size: 20px;
    .icon{
      margin-right: 12px;
      font-size: 40px;
    }
  }
}
</style>
