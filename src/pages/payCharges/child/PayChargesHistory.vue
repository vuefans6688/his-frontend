<template>
  <div class="record">
    <div class="header my_titleInpStyle">
      <span>客户：</span>
      <input class='myInput' v-model="searchCondition.keyword" placeholder="客户姓名或手机号" />
      <DateRangePicker :value='searchCondition.dateVal' :attributes='date_range_picker_attributes'></DateRangePicker>
    </div>
    <div class="content">
      <el-table :data="chargedList" align='center' size='small' stripe class="white_nowrap_column">
         <el-table-column type="index" label="序号" align='center'>
        </el-table-column> 
        <el-table-column prop="registid" label="挂号单" align='center' min-width="100">
        </el-table-column>
        <el-table-column prop="name" label="姓名" align='center'>
        </el-table-column>
        <!-- <el-table-column label="性别" align='center'>
          <template slot-scope="scope">{{scope.row.gender | sexState}}</span> </template>
        </el-table-column> -->
        <el-table-column prop="phone" label="手机号" align='center'>
        </el-table-column>
        <el-table-column prop="department" label="科室" align='center'>
        </el-table-column>
        <el-table-column prop="doctor" label="医生" align='center'>
        </el-table-column>
        <el-table-column label="收费时间" align='center' min-width="120">
          <template slot-scope="scope">{{scope.row.paytime | chargeTime}}</template>
        </el-table-column>
        <el-table-column prop="cashier" label="操作人" align='center'>
        </el-table-column>
        <el-table-column label="总金额" align='center'>
          <template slot-scope="scope">{{scope.row.totalprice | chargeFeeStatus(scope.row.chargestatus)}}</template>
        </el-table-column>
        <el-table-column label="实收金额" align='center'>
          <template slot-scope="scope">{{scope.row.realprice | chargeFeeStatus(scope.row.chargestatus)}}</template>
        </el-table-column>
        <el-table-column label="减免金额" align='center'>
          <template slot-scope="scope">{{scope.row.reduceprice | chargeFeeStatus(scope.row.chargestatus)}}</template>
        </el-table-column>
        <el-table-column label="退费金额" align='center'>
          <template slot-scope="scope"><span class='back_fee_coloum'>{{scope.row.realprice | backFeeStatus(scope.row)}}</span></template>
        </el-table-column>
        <el-table-column label="支付(退费)方式" align='center'>
          <template slot-scope="scope">{{scope.row.paymethod | payMethod}}</template>
        </el-table-column>
        <el-table-column prop="control" label="操作" align='center'>
          <template slot-scope="scope">
            <span class="spans" @click="returnsFee(scope.row.registid, scope.row.chargestatus)">详情</span>
            <span class="spans" v-if='scope.row.chargestatus === 2' @click="returnsFee(scope.row.registid, scope.row.chargestatus)">查看</span>
            <span v-else class="spans" @click="returnsFee(scope.row.registid, scope.row.chargestatus)">退费</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
      <!-- 分页 -->
    <div>
      <el-pagination layout="total, prev, pager, next, jumper" :current-page="pageindex+1" :page-size="pagesize" :total="total" @current-change="handleCurrentChange"></el-pagination>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { payedList } from '@/serviceNormal/apiNormal';
import httpServerNormal from '@/serviceNormal/httpServerNormal';
import DateRangePicker from '@/components/DateRangePicker';

export default {
  components: { DateRangePicker },
  data() {
    return {
      isSelected: false,  // 是否精确查找
      searchCondition: {
        keyword: '', // 客户姓名或手机号
        dateVal: [new Date(), new Date()], // 日期
      },
      date_range_picker_attributes: {
        size: 'small',
        editable: false,
        clearable: false,
      },
      chargedList: [],
      pageindex: 0,  // 当前页码
      pagesize: 10,
      total: 0,
    };
  },
  methods: {
    // 分页搜索
    handleCurrentChange(val) {
      this.pageindex = val - 1;
      this.getChargedList();
    },
    getChargedList() {
      httpServerNormal(payedList, {
        name: this.searchCondition.keyword,
        fromdate: this.searchCondition.dateVal[0].format('yyyy-MM-dd'),
        todate: this.searchCondition.dateVal[1].format('yyyy-MM-dd'),
        chargestatus: -1,
        pageindex: this.pageindex,
        pagesize: this.pagesize,
      }).then((res) => {
        if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
          this.chargedList = res.entity || [];
          this.total = res.totalcount;
        }
      });
    },
    // 退费
    returnsFee(registid, chargestatus) {
      this.$router.push({ path: `/navigator/payCharges/returnsFee/${registid}/${chargestatus}` });
    },
  },
  computed: {
    ...mapGetters(['token', 'clinic']),
  },
  created() {
    this.getChargedList();
  },
  filters: {
    payMethod(paymethod) {
      const methods = [
        { index: 0, label: '其他' },
        { index: 1, label: '现金' },
        { index: 2, label: '银行卡' },
        { index: 3, label: '微信' },
        { index: 4, label: '支付宝' },
      ];
      const method = methods.find((obj) => {
        return obj.index === paymethod;
      });
      return method ? method.label : '';
    },
    // 退费金额过滤(收费记录返回0)
    backFeeStatus(price, row) {
      if (row.chargestatus === 1) {
        return '';
      } else if (row.chargestatus === 2) {
        return row.paymethod === 5 ? row.totalprice.toFixed(2) : price.toFixed(2);
      }
    },
    // 收费金额过滤器(如果是退费费记录，返回0)
    chargeFeeStatus(price, status) {
      if (status === 2) {
        return '';
      } else if (status === 1) {
        return price.toFixed(2);
      }
    },
    // 收费时间
    chargeTime(date) {
      return date.substr(0, date.length - 3);
    },
  },
  watch: {
    searchCondition: {
      handler() {
        this.pageindex = 0;
        this.pagesize = 10;
        this.getChargedList();
      },
      deep: true,
    },
  },
};
</script>

<style scoped lang='scss'>
@import "~@scss";
.record{
  position: relative;
  min-width: 1400px;
  padding: 30px 40px 60px 40px;
  .header{
    padding-bottom: 10px;
    font-size: 14px;
    border-bottom: 1px solid #ccc;
    min-width: 1000px;
    .el-date-editor{
      width: 260px;
      margin-right: 10px;
    }
  }
  .content{
    .el-table{
      font-size: 14px;
      .back_fee_coloum{
        color: red;
      }
    }
    .spans{
      color: $mainColor;
      cursor: pointer;
      margin-right: 5px;
    }
  }
  .el-pagination{
    @include pagination_to_bottom;
  }
}
</style>
