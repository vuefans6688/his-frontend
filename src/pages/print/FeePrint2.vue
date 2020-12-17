<template>
<div v-aotoClose>
  <div class="fee_print onePage" v-for='(feeDetail, index) in feeList' :key='index'>
    <h1 class="clinicname">{{clinicName}}{{feeDetail.type | payORback}}</h1>
    <el-row class='line_1'>
      <el-col :span='6'>姓名(单位): {{feeDetail.name}}</el-col>
      <el-col :span='8'>参保类型: {{feeDetail.BCC334}}</el-col>
      <el-col :span='10'>门诊流水号: {{feeDetail.liushui}}</el-col>
    </el-row>
    <el-row>
      <el-col :span='6'>医疗证号: {{feeDetail.yiliaoCard}}</el-col>
      <el-col :span='8'>电脑号: {{feeDetail.computerCard}}</el-col>
      <el-col :span='10'>打印日期: {{feeDetail.reg_time | date_filter }}</el-col>
    </el-row>
    <el-row>
      <el-col :span='24'>地址/电话: {{feeDetail.phone}}</el-col>
    </el-row>
    <div class="table_wrap">
      <table class='table'>
        <tr>
          <td>项目</td>
          <td>金额</td>
          <td>项目</td>
          <td>金额</td>
          <td>项目</td>
          <td>金额</td>
          <td>项目</td>
          <td>金额</td>
          <td>项目</td>
          <td>金额</td>
        </tr>
        <tr>
          <td>检查治疗</td>
          <td>{{feeDetail.checkTotalPrice.toFixed(2)}}</td>
          <td>西药</td>
          <td>{{feeDetail.westTotalPrice.toFixed(2)}}</td>
          <td>中成药</td>
          <td>{{feeDetail.zhongchengTotalPrice.toFixed(2)}}</td>
          <td>中草药</td>
          <td>{{feeDetail.zhongcaoTotalPrice.toFixed(2)}}</td>
          <td>其他</td>
          <td>{{feeDetail.otherTotalPrice.toFixed(2)}}</td>
        </tr>
        <tr>
          <td>总金额</td>
          <td>￥{{(parseFloat(feeDetail.printSbTotal)).toFixed(2)}}</td>
          <td colspan="8" class='align_left'>人民币(大写): {{feeDetail.printSbTotal | moneyUpperCase}}</td>
        </tr>
        <tr>
          <td>优惠金额</td>
          <td>￥ {{ feeDetail.reduce || 0 }}</td>
          <td>现金支付</td>
          <td>{{parseFloat(feeDetail.printsbCash.toFixed(2))}}</td>
          <td>账户支付</td>
          <td>{{parseFloat(feeDetail.printSbAccount.toFixed(2))}}</td>
          <td>基金支付</td>
          <td>{{parseFloat(feeDetail.printSbJijin.toFixed(2))}}</td>
          <td>收银员</td>
          <td>{{user.truename}}</td>
        </tr>
        <tr v-show='feeDetail.list && feeDetail.list.length'>
          <td colspan="10" class='align_left'>
            <el-row style='font-weight: 600; padding-left: 20px;'>
              <el-col :span="6">名称</el-col>
              <el-col :span="4">统一编码</el-col>
              <el-col :span="6">规格</el-col>
              <el-col :span="4">单价</el-col>
              <el-col :span="2">数量</el-col>
              <el-col :span="2">金额</el-col>
            </el-row>

            <div v-for='(testItem, testIndex) in feeDetail.list' :key='testIndex' style="margin-bottom: 0;">
              <div v-if="testItem.chargetype === 2">
                <el-row style='text-align: left;'>
                  <el-col :span="18">
                    <span v-if='testItem.data.prescript_type===1'>西/中成药处方</span>
                    <span v-if='testItem.data.prescript_type===2'>中药处方</span>
                    <span v-if='testItem.data.prescript_type===3'>输液处方</span>
                  </el-col>
                  <el-col :span="6">总计: {{testItem.szsbrecord.total}}</el-col>
                </el-row>
                <div style='padding-left: 20px;'>
                  <el-row v-for='(testDrug, TestIndex2) in testItem.data.drug_list' :key='TestIndex2'>
                    <el-col :span="6">{{testDrug.name}}</el-col>
                    <el-col :span="6">{{testDrug.druginfo.ake001}}</el-col>
                    <el-col :span="4">{{testDrug.spec_text}}</el-col>
                    <el-col :span="4">{{testDrug.druginfo.shebao_price}}/{{testDrug.total_unit}}</el-col>
                    <el-col :span="2">{{testDrug.total}} {{testDrug.total_unit}}</el-col>
                    <el-col :span="2">{{(testDrug.total * testDrug.druginfo.shebao_price).toFixed(2)}}</el-col>
                  </el-row>
                </div>
              </div>
              <el-row v-else>
                <el-col :span="6">{{testItem.data.name}}</el-col>
                <el-col :span="4">{{testItem.data.item.szsbcode}}</el-col>
                <el-col :span="6">&nbsp;</el-col>
                <el-col :span="4">{{testItem.data.item.szsbprice}}</el-col>
                <el-col :span="2">{{testItem.data.total}}</el-col>
                <el-col :span="2">{{testItem.szsbrecord.total}}</el-col>
              </el-row>
            </div>
          </td>
        </tr>
      </table>
      <el-row>
        <el-col :span='12'>支付前余额: {{feeDetail.personleftbp}}</el-col>
        <el-col :span='12'>支付后余额: {{feeDetail.personleft}}</el-col>
      </el-row>
      <el-row class='line_last'>
        <el-col :span='12'>如需开发票,请凭当日收据到收费处办理,过期不候!</el-col>  
        <el-col :span='12'>单位: {{clinicName}}</el-col>  
      </el-row>    
    </div>
  </div>
</div>
  
</template>

<script>
import { mapGetters } from 'vuex';
import { getClinicName } from '@/serviceNormal/apiNormal';
import httpServerNormal from '@/serviceNormal/httpServerNormal';
import { changeMoneyToChinese } from '@/utils/money';

export default {
  data() {
    return {
      clinicName: '',
    };
  },
  methods: {
    getClinic_Name() {  // 获取诊所名
      httpServerNormal(getClinicName).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.clinicName = res.clinic_name;
        }
      });
    },
  },
  created() {
    this.getClinic_Name();
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
    payORback(type) {
      return type === 1 ? '收费收据' : '退费单';
    },
    moneyUpperCase(total) {
      return changeMoneyToChinese(Math.abs(total));
    },
    date_filter(date_tile) {
      const str = `20${date_tile}`.substr(0, 8);
      return `${str.substr(0, 4)}-${str.substr(4, 2)}-${str.substr(6, 2)}`;
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
.fee_print{
  padding-top: 26px;
  font-size: 10px;
  &.onePage{
    page-break-after: always;
  }
  .clinicname{
    // margin-bottom: 4px;
    text-align: center;
  }
  .line_1{
    // margin-bottom: 6px;
  }
  .table_wrap{
    // margin-top: 4px;
    .table{
      width: 100%;
      border-top: 1px solid #000;
      border-left: 1px solid #000;
      text-align: center;     
      td{
        border-right: 1px solid #000;
        border-bottom: 1px solid #000;
        line-height: 16px;
        &.align_left{
          text-align: left;
        }
      }
    }
  }
  .line_last{
    // margin-top: 6px;
  }
}
@media print {
  .fee_print {
    width: 90%;
    margin: 0 auto;
    float: none;
  }
  @page { margin: 2cm; size: A4; }

  html {
    height: auto !important;
  }
  html,body {
    background-color: white;
  }
  body {
    font: 6pt "宋体", Georgia, "Times New Roman", Times, serif;
    line-height: 1;
    background: #fff !important;
    color: #000;
  }
}
</style>

