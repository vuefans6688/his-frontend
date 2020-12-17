<template>
  <div class="style">
    <div class="header my_titleInpStyle">
      <span>客户：</span>
      <input class='myInput' v-model="searchCondition.keyword" placeholder="客户姓名或手机号" />
      <DateRangePicker :value='searchCondition.dateVal' :attributes='date_range_picker_attributes'></DateRangePicker>
    </div>

    <div class="content">
      <el-table :data="charge_list" align='center' size='small' stripe>
        <el-table-column type="index" label="序号" align='center'>
        </el-table-column>
        <el-table-column prop="patient_name" label="姓名" align='center'>
        </el-table-column>
        <el-table-column prop="patient_phone" label="手机号" align='center'>
        </el-table-column>
        <el-table-column label="就诊日期" align='center'>
          <template slot-scope="scope">
            {{scope.row.create_time | dateFilter}}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="dispensing_class" label="消费类别" align='center'>
        </el-table-column> -->
        <el-table-column label="待缴金额" align='center'>
          <template slot-scope="scope">
             {{scope.row.total_price | PriceFilter}}
          </template>
        </el-table-column>
        <el-table-column prop="control" label="操作" align='center'>
          <template slot-scope="scope">
             <span class="operate" @click='payDetail(scope.row.items)'>收费</span> 
          </template>
        </el-table-column>
      </el-table>
    </div>
      <!-- 分页 -->
    <div class="pagination">
      <el-pagination layout="total, prev, pager, next, jumper" :total='total' :page-size='pagesize' :current-page="pageindex+1" @current-change="pageChage">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { chargeList } from '@/serviceNormal/apiNormal';
import httpServerNormal from '@/serviceNormal/httpServerNormal';
import DateRangePicker from '@/components/DateRangePicker';

export default {
  components: { DateRangePicker },
  data() {
    return {
      // 搜索关键词
      searchCondition: {
        keyword: '',
        dateVal: [new Date(), new Date()],   // 日期
      },
      date_range_picker_attributes: {
        editable: false,
        clearable: false,
        size: 'small',
      },
      pageindex: 0,  // 当前页数
      pagesize: 10,
      total: 0,
      charge_list: [],
    };
  },
  methods: {
    // 翻页
    pageChage(curPage) {
      this.pageindex = curPage - 1;
      this.getPayList();
    },
    payDetail(itemlist) {
      const registid = this.findRegistId(itemlist);
      this.$router.push({ path: `/navigator/payCharges/payDetail/${registid}` });
    },
    // 查找挂号id（每条收费项均有挂号id，默认取第一条）
    findRegistId(list) {
      return list[0].regist_id;
    },
    // 获取待收费列表
    getPayList() {
      httpServerNormal(chargeList, {
        name: this.searchCondition.keyword,
        date_from: this.searchCondition.dateVal[0].format('yyMMdd'),
        date_to: this.searchCondition.dateVal[1].format('yyMMdd'),
        status: 0, // 0待付费
        pageindex: this.pageindex,
        pagesize: this.pagesize,
      }).then((res) => {
        if (!(typeof res === 'string' && res.indexOf('ERRORCODE') !== -1)) {
          this.charge_list = res.items || [];
          this.total = res.total;
        }
      });
    },
  },
  watch: {
    searchCondition: {
      handler() {
        this.pageindex = 0;
        this.pagesize = 10;
        this.getPayList();
      },
      deep: true,
    },
  },
  filters: {
    dateFilter(str1) {
      const str = str1 + '';
      return '20' + str.substr(0, 2) + '-' + str.substr(2, 2) + '-' + str.substr(4, 2);
    },
  },
  computed: {
    ...mapGetters(['clinic', 'token', 'user']),
  },
  mounted() {
    this.getPayList();
  },
};
</script>
<style scoped lang='scss'>
@import "~@scss";
.style{
  position: relative;
  min-width: 700px;
  padding: 30px 40px 60px 40px;
  .header{
    padding-bottom: 10px;
    font-size: 14px;
    border-bottom: 1px solid #ccc;
    .el-select{
      width: 150px;
      margin-right: 10px;
    }
  }
  .content .el-table{
    font-size: 14px;
    .operate{
      color: $mainColor;
      cursor: pointer;
    }
  }
  .pagination{
    @include pagination_to_bottom;
  }
}
</style>
