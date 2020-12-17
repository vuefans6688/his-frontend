<template>
  <div class="style">
    <div class="header my_titleInpStyle">
      <span>客户：</span>
      <!-- <el-input v-model="name" placeholder="客户姓名或手机" size='small'></el-input> -->
      <input type="text" class="myInput" v-model="name" placeholder="客户姓名或手机">
      <DateRangePicker :value='dateVal' :attributes='date_range_picker_attributes'></DateRangePicker>
    </div>
    <div class="content">
      <el-table :data="tableData" style="width: 100%" class="med_tab" align='center' stripe size="small">
        <el-table-column type="index" label="序号" align='center'>
        </el-table-column>
        <el-table-column prop="patient_name" label="姓名" align='center' :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="手机号" align='center' :show-overflow-tooltip="true">
          <template slot-scope="props">
            <span> {{ props.row.patient_phone | undefineFilter}} </span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="就诊日期" align='center' :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="diagn_result" label="诊断" align='center' :show-overflow-tooltip="true">
          <!-- <template slot-scope="props">
            <span> {{ props.row.patient_phone | undefineFilter}} </span>
          </template> -->
        </el-table-column>
        <el-table-column prop="control" label="操作" align='center'>
          <template slot-scope="scope">
           <span class="check" @click='check(scope.row.regist_id)'>查看</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10"
          layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
import httpServerNormal from '@httpServerNormal';
import { diagnosisList } from '@apiNormal';
import DateRangePicker from '@/components/DateRangePicker';

export default {
  components: { DateRangePicker },
  data() {
    return {
      name: '', // 客户姓名或手机号
      date_range_picker_attributes: {
        size: 'small',
        editable: false,
        clearable: false,
        align: 'center',
      },
      dateVal: [new Date(), new Date()],   // 日期
      tableData: [],

      // 分页
      currentPage: 1,
      pageSize: 10,
      total: 0,
    };
  },
  methods: {
    makeDateTimeString(timestamp) {
      const str = '' + timestamp;
      return '20' + str.substr(0, 2) + '-' + str.substr(2, 2) + '-' + str.substr(4, 2) + ' ' + str.substr(6, 2) + ':' + str.substr(8, 2) + ':' + str.substr(10, 2);
    },
    handleCurrentChange(val) {  // 切换页数
      this.currentPage = val;
      this.getDiagnosisList();
    },
    // handlePageSizeChange(val) {  // 改变页大小
    //   this.pageSize = val;
    //   this.getDiagnosisList();
    // },
    check(id) {
      this.$router.push({ path: '/navigator/doctorStation/checkClientMes', query: { patientId: id } });
    },
    getDiagnosisList() {
      httpServerNormal(diagnosisList, {
        name: this.name,
        date_from: this.dateVal[0].format('yyMMdd'),
        date_to: this.dateVal[1].format('yyMMdd'),
        page_index: this.currentPage - 1,
        page_size: this.pageSize,
      }).then((res) => {
        if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
          const data = res.items || [];
          this.tableData = data.map((val) => {
            val.create_time = this.makeDateTimeString(val.create_time);
            return val;
          });
          this.total = res.total;
        }
      });
    },
  },
  created() {
    this.getDiagnosisList();
  },
  watch: {
    name: {
      handler() {
        this.currentPage = 1;
        this.getDiagnosisList();
      },
    },
    dateVal: {
      handler() {
        this.currentPage = 1;
        this.getDiagnosisList();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@scss";
.style{
  min-height: 100%;
  padding: 30px 40px 60px 40px;
  position: relative;
}
.header{
  padding: 10px 0;
  font-size: 14px;
  .el-input{
    width: 150px;
    margin-right: 20px;
  }
}
.content{
  border-top: 1px solid #ccc;
  margin-bottom: 20px;
}
.pagination{
  @include pagination_to_bottom;
}
.check{
  color: $mainColor;
  cursor: pointer;
}
</style>

