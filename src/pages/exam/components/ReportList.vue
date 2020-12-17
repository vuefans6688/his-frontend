<template>
  <div class="reportQuery">
    <div v-if='chargeDisable'>
      <div class="regTitle my_titleInpStyle">
        
        <DateRangePicker :value='searchDate.dateVal' :attributes='date_range_picker_attributes'></DateRangePicker>
        
        <el-input v-model="searchDate.patientName" size="mini" placeholder="患者姓名"/>
        <el-button type="primary" size='mini' @click='printSelected()'>合并打印</el-button>
        <!-- <el-button type="danger" size='mini' @click='toggle_phone'>更换手机</el-button> -->
        <!-- <el-button type="primary" size='small' @click='printUnPrinted()'>未打印报告批量打印</el-button> -->
      </div>
      <div class="content">
        <div class="checkInfo">
          {{`当前查询结果：共【${this.total}】条记录`}}
        </div>
        <!-- table -->
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%; marginTop: 14px"
          :border="true"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="订单时间" align='center' width="120">
            <template slot-scope="scope">{{ scope.row.create_time | clinicDateFilter }}</template>
          </el-table-column>
          <el-table-column align='center' label="姓名" prop="patient"></el-table-column>
          <el-table-column prop="gender" align='center' label="性别" width="120" />
            <!-- 二级目录用于检索性别 -->
            <!-- <el-table-column prop="gender" align='center'>
              <template slot="header" slot-scope="slot">
                <el-select v-model="searchDate.gender" size="mini">
                  <el-option label="全部" :value="0"></el-option>
                  <el-option label="男" :value="1"></el-option>
                  <el-option label="女" :value="2"></el-option>
                </el-select>
              </template>
            </el-table-column> -->
          <el-table-column prop="age" align='center' label="年龄" width="60" />
            <!-- 二级目录用于检索年龄 -->
            <!-- <el-table-column prop="age" align='center'>
              <template slot="header" slot-scope="slot">
                <el-input v-model="searchDate.patientAge" size="mini" placeholder="年龄"/>
              </template>
            </el-table-column> -->
          <el-table-column prop="phone" align='center' label="患者电话" width="120" />
          <el-table-column align='center' label="送检项目" show-overflow-tooltip>
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.ins_array | insFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="doctor" align='center' label="送检医生" width="120" />
          <el-table-column label="报告状态" align='center' width="80">
            <template slot-scope="scope">
              <!-- {{ scope.row | reportStatusFilter }} -->
              <span style="color: #f00" v-if="scope.row.report_status === 0">未出</span>
              <span style="color: #7fbe7f" v-if="scope.row.report_status === scope.row.barcode_array.length">全出</span>
              <span style="color: #ff9900" v-if="scope.row.report_status !== 0 && scope.row.report_status < scope.row.barcode_array.length">部分出</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button v-show="scope.row.report_status !== 0" type="text" @click="check_report(scope.row)">查看报告</el-button>
              <el-button v-show="scope.row.report_status === 0" type="text" :disabled="true">未出报告</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
          layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>

    <p class="data_not_found" v-else>
      <i class="el-icon-s-help icon"></i>
      <span>请联系业务员进行送检业务关联!</span> 
    </p>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { InsBindCheck, InsGetOrder, InsGetReportList, InsGetReportById, PublicQiniuUrl } from '@apiNormal';
import httpServerNormal from '@httpServerNormal';
import DateRangePicker from '@/components/DateRangePicker';

export default {
  components: { DateRangePicker },
  data() {
    return {
      searchDate: {
        dateVal: [new Date(new Date() - (1000 * 60 * 60 * 24 * 7)), new Date()],   // 日期
        patientName: '',
      },
      date_range_picker_attributes: {
        size: 'mini',
        editable: false,
        clearable: false,
      },
      tableData3: [],
      tableData: [],
      // 检查是否绑定
      chargeDisable: false,
      // 记录表格的勾选项
      multipleSelection: [],
      // 分页
      currentPage: 1,
      pageSize: 10,
      total: 0,
    };
  },
  methods: {
    handleCurrentChange(val) {  // 切换页数
      this.currentPage = val;
      this.getInsOrders();
    },
    // 表格的选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      console.log('这里是选中的handleSelectionChange', val);
      this.multipleSelection = val;
    },
    // 查询类型改变
    typeChange() {
      console.log(111);
    },
    check_report(row) {
      console.log(row);
      httpServerNormal(InsGetReportById, {
        order_id: row.order_id,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          window.open(`${PublicQiniuUrl}/${res}`);
        } else {
          console.log('获取报告地址失败');
        }
      });
    },
    // 打印相关
    printSelected() {
      console.log('点击了打印', this.multipleSelection);
      if (!this.multipleSelection.length) {
        this.$message({ message: '请选择报告', type: 'warning' });
        return;
      }
      console.log('点击了打印2', this.multipleSelection);
      let idarr = [];
      this.multipleSelection.forEach((v) => {
        idarr = idarr.concat(v.barcode_id_array);
      });
      console.log('idarr', idarr);
      httpServerNormal(InsGetReportList, {
        barcode_array: idarr,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          console.log('获取报告地址成功', res);
          window.open(res);
        } else {
          console.log('获取报告地址失败');
        }
      });
    },
    InsBindCheck() {
      httpServerNormal(InsBindCheck, {
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          if (res === 0) {
            this.chargeDisable = false;
            this.tableData = [];
            console.log(this.chargeDisable);
          } else {
            this.chargeDisable = true;
            // 获取报告
            this.getInsOrders();
          }
        } else {
          this.chargeDisable = false;
          this.tableData = [];
          console.log(this.chargeDisable);
        }
      });
    },
    // 获取订单
    getInsOrders() {
      httpServerNormal(InsGetOrder, {
        begin_time: this.searchDate.dateVal[0].format('yyyy-MM-dd'),
        end_time: this.searchDate.dateVal[1].format('yyyy-MM-dd'),
        patient: this.searchDate.patientName,
        page_index: this.currentPage,
        page_size: this.pageSize,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          console.log('获取订单成功', res);
          this.total = res.total;
          this.tableData = res.total === 0 ? [] : res.data;
        } else {
          console.log('获取订单失败');
        }
      });
    },
  },
  props: {
  },
  watch: {
    searchDate: {
      handler() {
        this.currentPage = 1;
        this.getInsOrders();
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters(['user', 'clinic', 'token']),
  },
  filters: {
    insFilter(itemsList) {
      let label = '';
      itemsList.forEach((item) => {
        label += `${item}、`;
      });
      return label ? label.substr(0, label.length - 1) : '';
    },
    reportStatusFilter(row) {
      if (row.report_status === 0) {
        // return '<h1 style="color:red">123</h1>';
        return '<span>未出</span>';
      } else if (row.report_status === row.barcode_array.length) {
        return '已全出';
      }
      return '部分出';
    },
    clinicDateFilter(str1) {
      const str = str1 + '';
      return '20' + str.substr(0, 2) + '-' + str.substr(2, 2) + '-' + str.substr(4, 2);
    },
  },
  created() {
    this.InsBindCheck();
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";

.reportQuery {
  padding: 30px 40px 60px 40px;
  display: flex;
  position: relative;
  flex-direction: column;
  .regTitle {
    height: 40px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    min-width: 1100px;
    .el-input,
    .el-select{
      width: 150px;
      margin-right: 10px;
    }
  }
  .content{
    margin-top: 10px;
    padding: 15px 20px;
    // min-height: 500px;
    background-color: #f5f7fa;
    .checkInfo{
      line-height: 40px;
      height: 40px;
      border-radius: 8px;
      padding: 0 20px;
      vertical-align: middle;
      background-color: #ddd;
    }
  }
  .pagination{
    @include pagination_to_bottom;
  }
  .right_hover{
    max-width: 200px;
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
