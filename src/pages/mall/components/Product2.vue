<template>
  <el-row class="product">
    <el-col :span="16">
      <div class="product_desc">
        <img class="picture" src="/static/logo2.png" :alt="prod.picture" @dragstart="(e)=>{e.preventDefault();}">
        <div class="right">
          <p class="title">{{prod.product_name}}</p>
          <p class="description">{{prod.title1}}</p>
        </div>
      </div>
    </el-col>
    <el-col :span="2" class="price">￥ {{(prod.sale_price/100).toFixed(2)}}</el-col>
    <el-col :span="4">{{prod.store_num}}</el-col>
    <el-col :span="2" class="price">￥ {{ ((prod.sale_price * prod.store_num)/100).toFixed(2) }}</el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    prod: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@scss';

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
}
</style>
