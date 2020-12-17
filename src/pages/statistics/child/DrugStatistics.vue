<template>
  <div class='style'>
    <!--挂号查询  -->
    <div class="content">
        <div class="regTitle my_titleInpStyle">
          <DateRangePicker :value='searchDate.statisticalDate' :attributes='date_range_picker_attributes'></DateRangePicker>
        </div>
        <div class="table">
          <el-table :data="drugTable" ref="multipleTable" size="medium" stripe align="center">
            <el-table-column type="index" label="序号" align='center'></el-table-column>
            <el-table-column label="药品名称" align='center' prop="productname">
            </el-table-column>
            <el-table-column label="药品规格" align='center' prop="spectxt">
            </el-table-column>
            <el-table-column label="数量" align='center' prop="">
              <template slot-scope="scope">
                {{scope.row.xiaoshou_num}}{{scope.row.xiaoshou_dw}}
              </template>
            </el-table-column>
            <el-table-column label="批发单价" align='center' prop="costprice">
            </el-table-column>
            <el-table-column label="销售单价" align='center' prop="saleprice">
            </el-table-column>
            <el-table-column label="批发总价" align='center'>
              <template slot-scope="scope">
                {{scope.row.xiaoshou_num * scope.row.costprice}}
              </template>
            </el-table-column>
            <el-table-column label="销售总价" align='center'>
              <template slot-scope="scope">
                {{scope.row.xiaoshou_num * scope.row.saleprice}}
              </template>
            </el-table-column>
            <el-table-column label="利润" align='center' prop="">
              <template slot-scope="scope">
                {{(scope.row.saleprice * scope.row.xiaoshou_num - scope.row.costprice * scope.row.xiaoshou_num) | limitFilter}}
              </template>
            </el-table-column>
            <el-table-column label="日期" align='center'>
              <template slot-scope="scope">
                {{ scope.row.date | makeDateTimeString}}
              </template>
            </el-table-column>
          </el-table>
        </div>
    </div>
    <div class="pagination">
      <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="15" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import httpServerNormal from '@httpServerNormal';
import { szsbdruglogs } from '@apiNormal';
import DateRangePicker from '@/components/DateRangePicker';

export default {
  components: { DateRangePicker },
  data() {
    return {
      drugTable: [],  // 数据
      searchDate: {
        drug_name: '',   // 药品名
        drug_type: '',   // 收费类型
        statisticalDate: [new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date()], // 日期
      },
      date_range_picker_attributes: {
        size: 'small',
        editable: false,
        clearable: false,
      },
      total: 0,    // 总页数
      currentPage: 1,
    };
  },
  methods: {
    handleCurrentChange(val) {  // 切换页数
      this.currentPage = val;
      this.getData();
    },
    // 调药品销售统计接口
    getData() {
      const beginTime = this.searchDate.statisticalDate[0].format('yyyyMMdd');
      const endTime = this.searchDate.statisticalDate[1].format('yyyyMMdd');
      httpServerNormal(szsbdruglogs, {
        begin_time: beginTime,
        end_time: endTime,
        page_index: this.currentPage - 1,
        page_size: 15,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.drugTable = res.result || [];
          this.total = res.totalnum || 0;
        }
      });
    },
  },
  created() {
    this.getData(); // 调药品销售统计接口
  },
  computed: {
    ...mapGetters(['clinic', 'token', 'user']),
  },
  filters: {
    makeDateTimeString(timestamp) {
      const str = '' + timestamp;
      return str.substr(0, 4) + '-' + str.substr(4, 2) + '-' + str.substr(6, 2);
    },
    limitFilter(Num) {
      return Num.toFixed(2);
    },
  },
  watch: {
    searchDate: {
      handler() {
        this.currentPage = 1;
        this.getData();
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";
.style{
  position: relative;
  box-sizing: border-box;
  min-width: 1200px;
}
.regTitle {
    line-height: 40px;
    min-height: 40px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    vertical-align: middle;
    min-width: 1100px;
    .el-input,
    .el-select,{
      width: 150px;
      margin-right: 10px;
    }
}
.table{
  .el-table {
    min-width: 1200px;
  }
  .operation{
    cursor: pointer;
    color: $mainColor;
    margin-left: 10px;
  }
}
.pagination{
    @include pagination_to_bottom;
}
</style>
