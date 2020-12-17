<template>
  <div class="chargeRecord no_padding_left_table">
    <div class='content'>
      <el-table
        :data="chargeRecordList" size="small"
        style="width: 100%">
        <el-table-column type="index" label="序号" align='center'>
        </el-table-column>
        <el-table-column
          label="收/退费时间" prop='paytime'
          width="140" align='center'>
        </el-table-column>
        <el-table-column
          prop="department"
          label="就诊科室" align='center'>
        </el-table-column>
        <el-table-column
          prop="doctor"
          label="就诊医生" align='center'>
        </el-table-column>
        </el-table-column>
        <el-table-column
          label="应收总金额" align='center'>
          <template slot-scope="scope">
              {{scope.row.totalprice | isCharge(1, scope.row.chargestatus)}}
          </template>
        </el-table-column>
        <el-table-column
          label="实收金额" align='center'>
          <template slot-scope="scope">
              {{scope.row.realprice | isCharge(1, scope.row.chargestatus)}}
          </template>
        </el-table-column>
        </el-table-column>
        <el-table-column
          label="退费金额" align='center'>
          <template slot-scope="scope">
              <span class='backfee_coloum'>{{scope.row.realprice | isCharge(2, scope.row.chargestatus)}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="赊账金额">
          <template slot-scope="scope">
              {{scope.row.ownFee | PriceFilter}}
          </template>
        </el-table-column> -->
        <el-table-column
          label="现金" align='center'>
          <template slot-scope="scope">
              {{scope.row.payprice || scope.row.realprice | payMethodFilter(1, scope.row.paymethod)}}
          </template>
        </el-table-column>
        <el-table-column
          label="银行卡" align='center'>
          <template slot-scope="scope">
              {{scope.row.payprice || scope.row.realprice | payMethodFilter(2, scope.row.paymethod)}}
          </template>
        </el-table-column>
        <el-table-column
          label="微信支付" align='center'>
          <template slot-scope="scope">
              {{scope.row.payprice || scope.row.realprice | payMethodFilter(3, scope.row.paymethod)}}
          </template>
        </el-table-column>
        <el-table-column
          label="支付宝支付" align='center'>
          <template slot-scope="scope">
              {{scope.row.payprice || scope.row.realprice | payMethodFilter(4, scope.row.paymethod)}}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination layout="total, prev, pager, next, jumper" :page-size="condition.pagesize" :total="total" @current-change="handleCurrentChange"></el-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { jsTimestampFilter } from '@/utils/filters';
import { customerPayedList } from '@/serviceNormal/apiNormal';
import httpServerNormal from '@/serviceNormal/httpServerNormal';

export default {
  props: {
    customerID: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      chargeRecordList: [],
      condition: {
        fromdate: new Date(2000, 1, 1).format('yyyy-MM-dd'),
        todate: new Date().format('yyyy-MM-dd'),
        chargestatus: -1, // 查询所有
        pagesize: 15,
        pageindex: 0,
      },
      total: 0,
    };
  },
  methods: {
    getDate(row, cell, cellValue) {
      return jsTimestampFilter(cellValue, 'yyyy-MM-dd hh:mm') || '--';
    },
    // 获取费用列表
    getChargedList() {
      httpServerNormal(customerPayedList, {
        patientid: this.customerID,
        ...this.condition,
      }).then((res) => {
        if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
          this.chargeRecordList = res.entity || [];
          this.total = res.totalcount || 0;
        }
      });
    },
    // 翻页
    handleCurrentChange(pageindex) {
      this.condition.pageindex = pageindex - 1;
      this.getChargedList();
    },
  },
  computed: {
    ...mapGetters(['token', 'clinic']),
  },
  filters: {
    // 判断为收费记录或者退费记录
    isCharge(date, rowStatus, dataStatus) {
      return rowStatus === dataStatus ? date : '';
    },
    // 判断何种支付方式
    payMethodFilter(price, rowStatus, dataStatus) {
      return rowStatus === dataStatus ? price : 0;
    },
  },
  created() {
    this.getChargedList();
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";
.chargeRecord{
  .el-table{
    font-size: 14px;
    .backfee_coloum{
      color: red;
    }
  }
  .el-pagination{
    @include pagination_to_bottom;
  }
}
</style>
