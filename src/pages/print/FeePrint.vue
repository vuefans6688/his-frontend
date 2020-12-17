<template>
  <div class="fee_print" v-aotoClose>
    <p class="title">{{clinicName}}收费清单</p>
    <div class="line"></div>
    <div class="header">
      <el-row>
        <el-col :span="24">姓名： {{feeList.name}}</el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="24">病历号: {{feeList.feeid}}</el-col>
      </el-row>-->
      <el-row>
        <el-col :span="24">收费时间: {{ feeList.reg_time ? dateTimeFilter(feeList.reg_time) : new Date().format('yyyy-MM-dd hh:mm:ss') }}</el-col>
      </el-row>
    </div>
    <div class="content">
      <el-row>
        <el-col :span="10">收费项目</el-col>
        <el-col :span="5">单价</el-col>
        <el-col :span="5">数量</el-col>
        <el-col :span="4">金额</el-col>
      </el-row>
      <ul class="fee_list" v-for="(item, index) in feeList.items" :key="index">
        <li v-if="item.type === 1 || item.chargetype === 1">
          <!-- <el-row >
            <el-col :span="12">{{item.data.feename}}&nbsp;</el-col>
            <el-col :span="6">{{item.data.feeprice}}</el-col>
            <el-col :span="6">1</el-col>
          </el-row>-->
        </li>
        <li v-else-if="item.type === 2 || item.chargetype === 2">
          <el-row v-for="(drug_item, index2) in item.data.drug_list" :key="index2">
            <el-col :span="10">{{drug_item.name}}</el-col>
            <el-col :span="5">{{drug_item.price}}元/{{drug_item.price_unit}}</el-col>
            <el-col :span="5">
              <!-- 中药 -->
              <span v-show="item.data.prescript_type === 2"> 
                {{drug_item.dosage}}{{drug_item.dose_unit}}*{{drug_item.total}}剂
              </span>
              <!-- 西药 -->
              <span v-show="item.data.prescript_type === 1 || item.data.prescript_type === 3">
                {{drug_item.total}}{{drug_item.total_unit}}
              </span>
              &nbsp;
            </el-col>
            <el-col :span="4">{{(parseFloat(drug_item.total_price)).toFixed(2)}}元</el-col>
          </el-row>
        </li>
        <li v-else>
          <el-row>
            <el-col :span="10">{{item.data.name}}</el-col>
            <el-col :span="5">{{item.data.price}}元</el-col>
            <el-col :span="5">{{item.data.total}}</el-col>
            <el-col :span="4">{{item.data.total_price.toFixed(2)}}元</el-col>
          </el-row>
        </li>
      </ul>
    </div>
    <div class="line"></div>
    <div class="fee_calculate">
      <el-row>
        <el-col :span="12">应收金额: {{parseFloat(feeList.needPay).toFixed(2)}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">实收金额: {{parseFloat(feeList.realPay? feeList.realPay : 0).toFixed(2)}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">减免金额: {{parseFloat(feeList.discount).toFixed(2)}}</el-col>
      </el-row>
    </div>
    <div class="line"></div>
    <div class="footer">
      <el-row>
        <el-col :span="24">收费单位（盖章）</el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="24">医生： {{feeList.doctorname}}</el-col>
      </el-row>-->
      <el-row>
        <el-col :span="24">收银员: {{user.truename}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">客户签名:
          <span class="sign"></span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">电话/地址: {{feeList.phone}}</el-col>
      </el-row>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getClinicName } from '@/serviceNormal/apiNormal';
import httpServerNormal from '@/serviceNormal/httpServerNormal';

export default {
  data() {
    return {
      clinicName: '',
    };
  },
  methods: {
    dateTimeFilter(nanoSec) {
      if (!nanoSec) {
        return '';
      }
      const str = `20${nanoSec}`.substr(0, 8);
      return `${str.substr(0, 4)}-${str.substr(4, 2)}-${str.substr(6, 2)} ${str.substr(8, 2)}`;
    },
    getClinic_Name() {
      // 获取诊所名
      httpServerNormal(getClinicName).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.clinicName = res.clinic_name;
        }
      });
    },
    time(t) {
      const year = t.getFullYear();
      // 由于 getMonth 返回值会比正常月份小 1
      const month = t.getMonth() + 1;
      const day = t.getDate();
      return year + '-' + month + '-' + day;
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
  filters: {
    date_filter(date_tile) {
      const str = `20${date_tile}`.substr(0, 8);
      return `${str.substr(0, 4)}-${str.substr(4, 2)}-${str.substr(6, 2)}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.fee_print {
  padding-top: 20px;
  font-size: 10px;
  .line {
    padding: 3px 0;
    border-bottom: 1px dashed #000;
  }
  .el-row {
    line-height: 20px;
  }
  .title {
    text-align: center;
    line-height: 20px;
    font-weight: 600;
  }
  .content .el-row {
    .el-col {
      text-align: center;
    }
  }
}
@media print {
  .fee_print {
    width: 90%;
    margin: 0 auto;
    float: none;
  }
  @page {
    margin: 0.5cm;
    size: 5.5in 8.5in;
  }

  html {
    height: auto !important;
  }
  html,
  body {
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

