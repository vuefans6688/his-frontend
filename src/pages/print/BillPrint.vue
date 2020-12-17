<template>
<div v-aotoClose>
  <div class="bill_print onePage" v-for='(feeDetail, index) in feeList' :key='index'>
    <h1 class="title">&nbsp;</h1>
    <el-row class='header'>
      <el-col :span='2'>&nbsp;</el-col>
      <el-col :span='8'>{{feeDetail.liushui}}&nbsp;</el-col>
      <el-col :span='8'>{{feeDetail.yiliaoCard}}&nbsp;</el-col>
      <el-col :span='6' class='text_left'>{{feeDetail.liushui.slice(-8)}}&nbsp;</el-col>
    </el-row>
    <el-row class='header'>
      <el-col :span='1'>&nbsp;</el-col>
      <el-col :span='3'>&nbsp;{{feeDetail.deptname}}</el-col>
      <el-col :span='8'>&nbsp;</el-col>
      <el-col :span='8'>&nbsp;</el-col>
      <el-col :span='4'>&nbsp;{{new Date().format('yyyy   MM   dd')}}</el-col>
    </el-row>

    <div class="print_body">
      <el-row class='line line1'>
        <el-col :span='1'>&nbsp;</el-col>
        <el-col :span='23'>{{feeDetail.name}}&nbsp;</el-col>
      </el-row>
      <el-row class='line line2'>
        <el-col :span='8'>&nbsp;</el-col>
        <el-col :span='4' v-if='feeDetail.isSb'>{{feeDetail.printSbJijin + feeDetail.printSbAccount}}&nbsp;</el-col>
        <el-col :span='4' v-else>&nbsp;</el-col>
        <el-col :span='3'>&nbsp;</el-col>
        <el-col :span='3'>&nbsp;{{feeDetail.printsbCash}}</el-col>
        <el-col :span='3'>&nbsp;</el-col>
        <el-col :span='3'>&nbsp;{{feeDetail.isSb | chargetypeFilter}}</el-col>
      </el-row>

      <el-row class='empty_line'>
        <el-col :span='24'>&nbsp;</el-col>
      </el-row>

      <!-- 分类 -->
      <el-row class="fee_body">
        <!-- 药品 -->
        <el-col :span='6'>&nbsp;
          <el-row v-if='feeDetail.westTotalPrice'>
            <el-col :span="10">西药</el-col>
            <el-col :span="14">{{feeDetail.westTotalPrice}}</el-col>
          </el-row>
          <el-row v-if='feeDetail.zhongchengTotalPrice'>
            <el-col :span="10">中成药</el-col>
            <el-col :span="14">{{feeDetail.zhongchengTotalPrice}}</el-col>
          </el-row>
          <el-row v-if='feeDetail.zhongcaoTotalPrice'>
            <el-col :span="10">中草药</el-col>
            <el-col :span="14">{{feeDetail.zhongcaoTotalPrice}}</el-col>
          </el-row>
        </el-col>

        <!-- 检查项 -->
        <el-col :span='6'>&nbsp;
          <el-row v-if='feeDetail.checkTotalPrice'>
            <el-col :span="10">检查费</el-col>
            <el-col :span="14">{{feeDetail.checkTotalPrice}}</el-col>
          </el-row>
        </el-col>

        <!-- 治疗项 -->
        <el-col :span='6'>&nbsp;</el-col>

        <!-- 其他项 -->
        <el-col :span='6'>&nbsp;
          <el-row v-if='feeDetail.otherTotalPrice'>
            <el-col :span="10">其他</el-col>
            <el-col :span="14">{{feeDetail.otherTotalPrice}}</el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row class='empty_line'>
        <el-col :span='24'>&nbsp;</el-col>
      </el-row>
      <el-row class='total line'>
        <el-col :span='5'>&nbsp;</el-col>
        <el-col :span='14'>{{feeDetail.printSbTotal | moneyUpperCase}}</el-col>
        <el-col :span='5'>&nbsp;{{feeDetail.printSbTotal}}</el-col>
      </el-row>
      <el-row class='remark'>
        <el-col>&nbsp;</el-col>
      </el-row>
    </div>

    <div class="footer">
      <el-row>
        <el-col :span='15'>&nbsp;</el-col>
        <el-col :span='9'>&nbsp;{{user.truename}}</el-col>
      </el-row>
    </div>
  </div>
</div>
  
</template>

<script>
import { mapGetters } from 'vuex';
import { changeMoneyToChinese } from '@/utils/money';

export default {
  data() {
    return {
    };
  },
  mounted() {
    setTimeout(() => {
      window.print();
      window.close();
    }, 500);
  },
  computed: {
    ...mapGetters(['feeList', 'user']),
  },
  filters: {
    chargetypeFilter(isSb) {
      return isSb ? '医保' : '自费';
    },
    moneyUpperCase(total) {
      return changeMoneyToChinese(Math.abs(total));
    },
  },
  directives: {
    aotoClose() {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          window.opener = null;
          window.open('', '_self');
          window.close();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.bill_print{
  padding: 6px;
  font-size: 10px;
  &.onePage{
    page-break-after: always;
  }
  .title{
    height: 45px;
  }
  .header{
    line-height: 18px;
  }
  .empty_line{
    height: 24px;
  }
  .print_body{
    .line{
      height: 24px;
    }
    .fee_body{
      height: 72px;
      .el-row{
        height: 24px;
      }
    }
    .remark{
      height: 45px;
    }
  }
  .footer{
    height: 24px;
  }
}
@media print {
  .bill_print {
    width: 90%;
    margin: 0 auto;
    float: none;
  }
  @page { margin: 2cm; }
  // @page { margin: 2cm; size: A4; }
  // @page { margin: 2cm 2cm 0 2cm; size: 9in 4.5in; }

  html {
    height: auto !important;
  }
  html,body {
    background-color: white;
  }
  body {
    font: 6pt "宋体", Georgia, "Times New Roman", Times, serif;
    line-height: 1.3;
    background: #fff !important;
    color: #000;
  }
}
</style>

