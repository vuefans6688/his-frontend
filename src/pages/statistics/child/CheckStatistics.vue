<template>
  <div class='style'>
    <!--挂号查询  -->
    <div class="content">
          <div class="regTitle my_titleInpStyle">
          <DateRangePicker :value='searchDate.dateVal' :attributes='date_range_picker_attributes'></DateRangePicker>
          
          <span>项目名称：</span>
          <el-select v-model="searchDate.chargeType" size="small">
            <el-option label="全部" value=""></el-option>
            <el-option :label="item.name" :value="item.item_id" v-for="item in payItem" :key="item.item_id"></el-option>
          </el-select>
        </div>
        <!--table  -->
        <div class="table">
          <el-table :data="chargeTable" ref="multipleTable" size="medium" stripe align="center">
            <el-table-column label="序号" align='center'>
              <template slot-scope="props">
                <span :class="{'totalPrice': props.row.index === '合计' }">{{ props.row.index }}</span>
              </template>
            </el-table-column>
            <el-table-column label="时间" align='center'>
              <template slot-scope="props">
                <span :class="{'totalPrice': props.row.index === '合计' }">{{ props.row.create_time }}</span>
              </template>
            </el-table-column>
            <el-table-column label="项目名称" align='center'>
              <template slot-scope="props">
                <span :class="{'totalPrice': props.row.index === '合计' }">{{ props.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="数量" align='center'>
              <template slot-scope="props">
                <span :class="{'totalPrice': props.row.index === '合计' }">{{ props.row.total }} {{ props.row.total_unit}}</span>
              </template>
            </el-table-column>
            <el-table-column label="单价" align='center'>
              <template slot-scope="props">
                <span :class="{'totalPrice': props.row.index === '合计' }">{{ props.row.price | PriceFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column label="总金额" align='center'>
              <template slot-scope="props">
                <span :class="{'totalPrice': props.row.index === '合计' }">{{ props.row.total_price | PriceFilter }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
    </div>
    <div class="pagination">
      <el-pagination @current-change="handleCurrentChange" :current-page="pageindex" :page-size="page_size" layout="total, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import httpServerNormal from '@httpServerNormal';
import { getChargitemList } from '@apiNormal';
import DateRangePicker from '@/components/DateRangePicker';

export default {
  components: { DateRangePicker },
  data() {
    return {
      chargeTable: [],  // 收费数据
      searchDate: {
        dateVal: [new Date(new Date() - (1000 * 60 * 60 * 24 * 30)), new Date()],   // 日期
        chargeType: '',   // 收费类型
      },
      date_range_picker_attributes: {
        size: 'small',
        editable: false,
        clearable: false,
      },
      payItem: [],
      pageindex: 1,  // 当前页数
      page_size: 10,
      totalCount: 0,    // 总页数
      Interval: null,  // 计时器名字
    };
  },
  methods: {
    handleCurrentChange(val) {  // 切换页数
      this.pageindex = val;
      this.getCheckList();
    },
    makeDateTimeString(timestamp) {
      const str = '' + timestamp;
      return '20' + str.substr(0, 2) + '-' + str.substr(2, 2) + '-' + str.substr(4, 2) + ' ' + str.substr(6, 2) + ':' + str.substr(8, 2);
    },
    getPayList() {  // 获取收费项目
      httpServerNormal(getChargitemList, {
        disabled: 2,
        type: 3,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          this.payItem = res && res.length ? res : [];
        }
      });
    },
    getCheckList() {
      this.$http.post('/service/stats/exames', {
        head: {
          accessToken: this.token,
          lastnotice: 0,
          msgid: '',
        },
        body: {
          clinic_id: this.clinic,
          exam_item_id: this.searchDate.chargeType,
          date_from: this.searchDate.dateVal[0].format('yyMMdd'),
          date_to: this.searchDate.dateVal[1].format('yyMMdd'),
          page_index: this.pageindex - 1,
          page_size: this.page_size,
        },
      }).then((respse) => {
        const res = respse.data;
        if (res.errcode === 0 && res.data.clinic_id === this.clinic) {
          // this.chargeTable = res.data.items || [];
          const data = res.data.items || [];
          this.chargeTable = data.map((val) => {
            val.create_time = this.makeDateTimeString(val.create_time);
            return val;
          });
          const obj = {
            index: '合计',
            create_time: `${this.searchDate.dateVal[0].getFullYear()}-${this.searchDate.dateVal[0].getMonth() + 1}-${this.searchDate.dateVal[0].getDate()} 至
            ${this.searchDate.dateVal[1].getFullYear()}-${this.searchDate.dateVal[1].getMonth() + 1}-${this.searchDate.dateVal[1].getDate()}`,
            name: '所有费用',
            total: res.data.sum_total,
            total_price: res.data.sum_sales,
          };
          this.chargeTable.forEach((val, index) => {
            val.index = index + 1;
          });
          this.chargeTable.unshift(obj);
          this.totalCount = res.data.total;
        } else {
          this.chargeTable = [];
          if (res.errcode !== 0) {
            this.$message({ message: res.data.errmsg, type: 'error', showClose: true, duration: 1000 });
          }
        }
      }).catch();
    },
  },
  mounted() {
    this.getPayList();   // 获取收费项目
    this.getCheckList();
  },
  computed: {
    ...mapGetters(['clinic', 'token', 'user']),
  },
  watch: {
    searchDate: {
      handler() {
        this.pageindex = 1;
        this.getCheckList();
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
  min-width: 1000px;
}
.regTitle {
    line-height: 40px;
    min-height: 40px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    vertical-align: middle;
    min-width: 1100px;
    .el-input,
    .el-select{
      width: 200px;
      margin-right: 20px;
    }
}
.table{
  .el-table {
    min-width: 1000px;
  }
  .totalPrice {
    font-size: 14px;
    font-weight: 600;
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
